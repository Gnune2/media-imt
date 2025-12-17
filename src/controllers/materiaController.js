const prisma = require('../config/prisma');

exports.criarMateria = async (req, res) => {
    const { name, image, passGrade, assessments } = req.body;
    const studentId = req.student.studentId;

    if (!name) return res.status(400).json({ error: "Nome obrigatório" });

    try {
        const newSubject = await prisma.subject.create({
            data: {
                name,
                image: image || "",
                passGrade: parseFloat(passGrade) || 6.0,
                student: { connect: { id: studentId } },
                assessments: {
                    create: assessments.map(av => ({
                        name: av.name,
                        weight: parseFloat(av.weight),
                        grade: parseFloat(av.grade) || 0
                    }))
                }
            }
        });
        res.status(201).json(newSubject);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar matéria" });
    }
};

exports.listarMaterias = async (req, res) => {
    try {
        const subjects = await prisma.subject.findMany({
            where: { studentId: req.student.studentId },
            include: { assessments: true }
        });
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar matérias" });
    }
};

exports.atualizarNotas = async (req, res) => {
    const { id } = req.params;
    const { grades } = req.body;
    try {
        const updates = grades.map(item => 
            prisma.assessment.update({
                where: { id: item.id },
                data: { grade: parseFloat(item.grade) }
            })
        );
        await Promise.all(updates);
        res.status(200).json({ message: "Notas atualizadas" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao salvar notas" });
    }
};

exports.eliminarMateria = async (req, res) => {
    const { id } = req.params;
    try {
        // Cascata manual necessária para MongoDB
        await prisma.assessment.deleteMany({ where: { subjectId: id } });
        await prisma.subject.delete({ where: { id: id } });
        res.status(200).json({ message: "Matéria e notas excluídas" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir no banco" });
    }
};