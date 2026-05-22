import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// 1. Menampilkan list category dari database
export const getCategories = async (req: Request, res: Response) => {
    try {
        const allCategories = await prisma.category.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(allCategories);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data kategori", error });
    }
};

// 2. Menyimpan data category ke database
export const createCategories = async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Nama harus diisi" });

    try {
        const newCategory = await prisma.category.create({
            data: { name: name, createdAt: new Date() } // tambahkan createdAt untuk memenuhi tipe
        });
        res.status(200).json({ message: "Data berhasil disimpan", category: newCategory });
    } catch (error) {
        res.status(500).json({ message: "Gagal menyimpan data", error });
    }
};

// 3. Menampilkan data category berdasarkan ID
export const showCategories = async (req: Request, res: Response) => {
    try {
        const category = await prisma.category.findUnique({
            where: { id: Number(req.params.id) }
        });
        if (!category) return res.status(404).json({ message: "Category tidak ditemukan" });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan server", error });
    }
};

// 4. Mengupdate category berdasarkan ID
export const updateCategories = async (req: Request, res: Response) => {
    try {
        const updatedCategory = await prisma.category.update({
            where: { id: Number(req.params.id) },
            data: { name: req.body.name }
        });
        res.json({ message: "Data berhasil diupdate", category: updatedCategory });
    } catch (error) {
        res.status(404).json({ message: "Category tidak ditemukan atau gagal diupdate" });
    }
};

// 5. Menghapus category berdasarkan ID
export const deleteCategories = async (req: Request, res: Response) => {
    try {
        await prisma.category.delete({
            where: { id: Number(req.params.id) }
        });
        res.json({ message: "Data berhasil dihapus" });
    } catch (error) {
        res.status(404).json({ message: "ID tidak ditemukan" });
    }
};