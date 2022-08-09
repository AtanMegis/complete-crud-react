import Room from "../models/Room.js";
import tryCatch from "./utils/tryCatch.js";

export const createRoom = tryCatch(async (req, res) => {
	const { id: uid, name: uName, photoURL: uPhoto } = req.user;
	const newRoom = new Room({ ...req.body, uid, uName, uPhoto });
	await newRoom.save();
	res.status(201).json({ success: true, result: newRoom });
});

export const getRooms = tryCatch(async (req, res) => {
	const rooms = await Room.find().sort({ _id: -1 }); // ? SORT BY LATEST ROOM
	res.status(200).json({ success: true, result: rooms });
});
// ! Testing resource access
/*res
	.status(201)
	.json({ success: true, result: { id: 123, title: "test room" } });*/
