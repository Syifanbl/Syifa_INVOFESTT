import { Request, Response } from "express";
import { prisma } from "../lib/db.js";
import bcrypt from "bcrypt";

// 1. Menampilkan semua user
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data user" });
    }
};

// 2. Menambah user
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, foto } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, dan password harus diisi" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                foto: foto || ""
            }
        });

        res.status(201).json({
            message: "User berhasil ditambahkan",
            user
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal menambahkan user" });
    }
};

// 3. Menampilkan user berdasarkan id
export const showUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil detail user" });
    }
};

// 4. Mengupdate user
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, password, foto } = req.body;

        const dataUpdate: any = {
            name,
            email,
            foto
        };

        if (password) {
            dataUpdate.password = await bcrypt.hash(password, 10);
        }

        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: dataUpdate
        });

        res.json({
            message: "User berhasil diupdate",
            user
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal update user" });
    }
};

// 5. Menghapus user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.user.delete({
            where: {
                id: Number(id)
            }
        });

        res.json({ message: "User berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Gagal hapus user" });
    }
};