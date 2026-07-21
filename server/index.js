import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ACADEMIC_OBJECTS } from '../src/data/physicsData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../src/data/physicsData.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize JSON data file if not existing
function loadObjects() {
  if (!fs.existsSync(DATA_FILE)) {
    saveObjects(ACADEMIC_OBJECTS);
    return ACADEMIC_OBJECTS;
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading physicsData.json, fallback to static:', err);
    return ACADEMIC_OBJECTS;
  }
}

function saveObjects(objects) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(objects, null, 2), 'utf-8');
}

// GET all physics objects
app.get('/api/objects', (req, res) => {
  const data = loadObjects();
  res.json({ success: true, count: data.length, data });
});

// POST create new object
app.post('/api/objects', (req, res) => {
  const newObj = req.body;
  if (!newObj.id || !newObj.label || !newObj.coords) {
    return res.status(400).json({ success: false, message: 'Missing required fields (id, label, coords)' });
  }

  const objects = loadObjects();
  if (objects.some(o => o.id === newObj.id)) {
    return res.status(400).json({ success: false, message: 'Object ID already exists' });
  }

  objects.push(newObj);
  saveObjects(objects);
  res.json({ success: true, message: 'Particle object added successfully', data: newObj });
});

// PUT update object
app.put('/api/objects/:id', (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  let objects = loadObjects();
  const index = objects.findIndex(o => o.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Object not found' });
  }

  objects[index] = { ...objects[index], ...updatedData };
  saveObjects(objects);
  res.json({ success: true, message: 'Particle object updated successfully', data: objects[index] });
});

// DELETE object
app.delete('/api/objects/:id', (req, res) => {
  const { id } = req.params;
  let objects = loadObjects();
  const filtered = objects.filter(o => o.id !== id);

  if (filtered.length === objects.length) {
    return res.status(404).json({ success: false, message: 'Object not found' });
  }

  saveObjects(filtered);
  res.json({ success: true, message: 'Particle object deleted successfully' });
});

// POST reset to default PDG dataset
app.post('/api/reset', (req, res) => {
  saveObjects(ACADEMIC_OBJECTS);
  res.json({ success: true, message: 'PDG dataset reset to default reference standard', count: ACADEMIC_OBJECTS.length, data: ACADEMIC_OBJECTS });
});

app.listen(PORT, () => {
  console.log(`[Physics Scale Space] Backend server running at http://localhost:${PORT}`);
});
