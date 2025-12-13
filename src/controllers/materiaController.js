const prisma = require('../config/prisma');

exports.criarMateria = async (req, res) => {
    const { name, image, assessments } = req.body;
    const studentId = req.student.studentId; // Vem do token validado

    if (!name) {
        return res.status(400).json({ error: "O nome da matéria é obrigatório" });
    }

    try {
        const newSubject = await prisma.subject.create({
            data: {
                name: name,
                image: image || "",
                student: {
                    connect: { id: studentId }
                },
                assessments: {
                    create: assessments
                }
            },
            include: {
                assessments: true
            }
        });

        res.status(201).json({
            message: "Matéria criada com sucesso!",
            subject: newSubject
        });
    } catch (error) {
        console.error("Erro ao criar matéria:", error);
        res.status(500).json({ error: "Erro interno ao salvar a matéria." });
    }
};

exports.listarMaterias = async (req, res) => {
    try {
        const studentId = req.student.studentId;
        const subjects = await prisma.subject.findMany({
            where: {
                studentId: studentId
            },
            include: {
                assessments: true
            }
        });
        res.status(200).json(subjects);
    } catch (error) {
        console.error("Erro ao buscar matérias:", error);
        res.status(500).json({ error: "Erro interno ao buscar matérias." });
    }
};