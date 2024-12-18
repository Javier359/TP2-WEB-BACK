const express = require("express");
const {
  findAll,
  create,
  findById,
  deleteById,
  logicDeleteById,
} = require("../services/studentsServices");
const {
  validateById,
  validateBody,
  studentExistent,
} = require("../middleware/studentsMiddleware");
const verifyToken = require("../middleware/authMiddleware"); // Importa el middleware

const router = express.Router();

/**obtener todos */
router.get("/", async (req, res) => { // RUTA SIN verifyToken
  try {
    const { search = "", currentPage = 1, pageSize = 5 } = req.query;
    const students = await findAll(search, currentPage, pageSize);
    res.json(students);
  } catch (error) {
    res.sendStatus(500);
  }
});

/**obtener por id */
router.get("/:id", validateById, async (req, res) => { // RUTA SIN verifyToken
  try {
    const student = await findById(Number(req.params.id));

    if (!student) {
      res.status(404).json({
        message: "Student not found",
      });
      return;
    }

    res.json(student);
  } catch (error) {
    res.sendStatus(500);
  }
});

/**crear */
router.post("/", verifyToken, validateBody, studentExistent, async (req, res) => {
  try {
    const newStudent = await create(req.body);
    res.json(newStudent);
  } catch (error) {
    console.error("Error al crear estudiante:", error.message);
    res.status(500).json({ message: error.message });
  }
});

/**borrar por id */
router.delete("/:id", verifyToken, validateById, async (req, res) => {
  try {
    await deleteById(req.params.id);
    res.json("Ok");
  } catch (error) {
    res.sendStatus(500);
  }
});

/**actualización lógica */
router.put("/:id", verifyToken, validateById, async (req, res) => {
  try {
    const logicDeletedStudent = await logicDeleteById(req.params.id, req.body);
    res.json(logicDeletedStudent);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
