import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// validasi tanggal
const parseDate = (value: unknown): Date | null => {
    const d = new Date(String(value));
    return Number.isNaN(d.getTime()) ? null : d;
};

// ==============================
// 1. Menampilkan semua event
// ==============================
export const getEvents = async (
    req: Request,
    res: Response
) => {

    try {

        const events = await prisma.event.findMany({
    include: {
    pembicara: true,
},
    orderBy: {
    createdAt: "desc",
},
});

        res.status(200).json(events);

    } catch (error: any) {

        console.error(error);

        res.status(500).json({
            message: "Gagal mengambil data event",
            error: error.message
        });

    }
};


// ==============================
// 2. Menambahkan event
// ==============================
export const createEvent = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            name,
            dateEvent,
            location,
            description
        } = req.body;

        // validasi input
        if (
            !name ||
            !dateEvent ||
            !location ||
            !description
        ) {
            return res.status(400).json({
                message: "Semua field wajib diisi"
            });
        }

        // validasi format tanggal
        const parsedDate = parseDate(dateEvent);

        if (!parsedDate) {
            return res.status(400).json({
                message: "Format tanggal tidak valid"
            });
        }

        // simpan ke database
        const newEvent = await prisma.event.create({
            data: {
                name,
                categoryId: 1,
                location,
                dateEvent: parsedDate,
                description,
                createdAt: new Date()
            },
        });

        res.status(201).json({
            message: "Event berhasil ditambahkan",
            event: newEvent
        });

    } catch (error: any) {

        console.error(error);

        res.status(500).json({
            message: "Gagal menambahkan event",
            error: error.message
        });

    }
};


// ==============================
// 3. Menampilkan detail event
// ==============================
export const showEvent = async (
    req: Request,
    res: Response
) => {

    try {

        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "ID tidak valid"
            });
        }

        const event = await prisma.event.findUnique({
            where: {
                id
            }
        });

        if (!event) {
            return res.status(404).json({
                message: "Event tidak ditemukan"
            });
        }

        res.status(200).json(event);

    } catch (error: any) {

        console.error(error);

        res.status(500).json({
            message: "Gagal mengambil detail event",
            error: error.message
        });

    }
};


// ==============================
// 4. Update event
// ==============================
export const updateEvent = async (
    req: Request,
    res: Response
) => {

    try {

        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "ID tidak valid"
            });
        }

        const existingEvent = await prisma.event.findUnique({
            where: {
                id
            }
        });

        if (!existingEvent) {
            return res.status(404).json({
                message: "Event tidak ditemukan"
            });
        }

        const {
            name,
            dateEvent,
            location,
            description
        } = req.body;

        const data: any = {};

        if (name) data.name = name;
        if (location) data.location = location;
        if (description) data.description = description;

        if (dateEvent) {

            const parsedDate = parseDate(dateEvent);

            if (!parsedDate) {
                return res.status(400).json({
                    message: "Format tanggal tidak valid"
                });
            }

            data.dateEvent = parsedDate;
        }

        const updatedEvent = await prisma.event.update({
            where: {
                id
            },
            data
        });

        res.status(200).json({
            message: "Event berhasil diupdate",
            event: updatedEvent
        });

    } catch (error: any) {

        console.error(error);

        res.status(500).json({
            message: "Gagal update event",
            error: error.message
        });

    }
};


// ==============================
// 5. Hapus event
// ==============================
export const deleteEvent = async (
    req: Request,
    res: Response
) => {

    try {

        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "ID tidak valid"
            });
        }

        const existingEvent = await prisma.event.findUnique({
            where: {
                id
            }
        });

        if (!existingEvent) {
            return res.status(404).json({
                message: "Event tidak ditemukan"
            });
        }

        await prisma.event.delete({
            where: {
                id
            }
        });

        res.status(200).json({
            message: "Event berhasil dihapus"
        });

    } catch (error: any) {

        console.error(error);

        res.status(500).json({
            message: "Gagal menghapus event",
            error: error.message
        });

    }
};