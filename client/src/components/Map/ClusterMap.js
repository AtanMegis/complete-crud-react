import React, { useEffect, useState } from 'react';
import { getRooms } from '../../actions/room';
import { useValue } from '../../context/ContextProvider';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Supercluster from 'supercluster';
import './ClusterMap.css';
import { Avatar, Paper, Tooltip } from '@mui/material';
import GeocoderInput from '../Sidebar/GeocoderInput';
import PopUpRoom from './PopUpRoom';

const supercluster = new Supercluster({
	radius: 75,
	maxZoom: 20,
});

const ClusterMap = () => {
	const {
		state: { filteredRooms },
		mapRef,
		dispatch,
	} = useValue();
	const [points, setPoints] = useState([]);
	const [clusters, setClusters] = useState([]);
	const [bounds, setBounds] = useState([-180, -85, 180, 85]);
	const [zoom, setZoom] = useState(0);
	const [popUpInfo, setPopUpInfo] = useState(null);

	useEffect(() => {
		getRooms(dispatch);
	}, []);

	useEffect(() => {
		const points = filteredRooms.map((room) => ({
			type: 'Feature',
			properties: {
				cluster: false,
				roomId: room._id,
				price: room.price,
				title: room.title,
				description: room.description,
				lng: room.lng,
				lat: room.lat,
				images: room.images,
				uPhoto: room.uPhoto,
				uName: room.uName,
			},
			geometry: {
				type: 'Point',
				coordinates: [parseFloat(room.lng), parseFloat(room.lat)],
			},
		}));
		setPoints(points);
	}, [filteredRooms]);

	useEffect(() => {
		supercluster.load(points);
		setClusters(supercluster.getClusters(bounds, zoom));
	}, [points, zoom, bounds]);

	useEffect(() => {
		if (mapRef.current) {
			setBounds(mapRef.current.getMap().getBounds().toArray().flat());
		}
	}, [mapRef?.current]);

	return (
		<ReactMapGL
			initialViewState={{ latitude: 51.5072, longitude: 0.1276 }}
			mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
			mapStyle="mapbox://styles/mapbox/streets-v11"
			ref={mapRef}
			onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
		>
			{clusters.map((cluster) => {
				const { cluster: isCluster, point_count } =
					cluster.properties;
				const [longitude, latitude] = cluster.geometry.coordinates;
				if (isCluster) {
					return (
						<Marker
							key={`cluster-${cluster.id}`}
							longitude={longitude}
							latitude={latitude}
						>
							<div
								className="cluster-marker"
								style={{
									width: `${
										10 +
										(point_count /
											points.length) *
											20
									}px`,
									height: `${
										10 +
										(point_count /
											points.length) *
											20
									}px`,
								}}
								onClick={() => {
									const zoom = Math.min(
										supercluster.getClusterExpansionZoom(
											cluster.id
										),
										20
									);
									if (
										mapRef.current.flyTo({
											center: [
												longitude,
												latitude,
											],
											zoom,
											speed: 1,
										})
									);
								}}
							>
								{point_count}
							</div>
						</Marker>
					);
				}

				return (
					<Marker
						key={`room-${cluster.properties.roomId}`}
						longitude={longitude}
						latitude={latitude}
					>
						<Tooltip title={cluster.properties.uName}>
							<Avatar
								src={cluster.properties.uPhoto}
								component={Paper}
								elevation={2}
								onClick={() =>
									setPopUpInfo(cluster.properties)
								}
							/>
						</Tooltip>
					</Marker>
				);
			})}
			<GeocoderInput />
			{popUpInfo && (
				<Popup
					longitude={popUpInfo.lng}
					latitude={popUpInfo.lat}
					closeOnClick={false}
					focusAfterOpen={false}
					onClose={() => setPopUpInfo(null)}
				>
					<PopUpRoom popUpInfo={popUpInfo} />
				</Popup>
			)}
		</ReactMapGL>
	);
};

export default ClusterMap;
// !	<PopUpRoom {...{popUpInfo}} /> l:154
