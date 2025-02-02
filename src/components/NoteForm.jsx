// src/components/NoteForm.jsx

import { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';

function NoteForm({ onSave, editingNote, setEditingNote }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    }
  }, [editingNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noteData = { title, content };
    
    try {
      if (editingNote) {
        await fetch(`http://localhost:8000/api/notes/${editingNote.id}/`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(noteData),
        });
      } else {
        await fetch('http://localhost:8000/api/notes/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(noteData),
        });
      }
      
      setTitle('');
      setContent('');
      setEditingNote(null);
      onSave();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          rows={4}
          required
        />
        <Button type="submit" variant="contained">
          {editingNote ? 'Actualizar' : 'Crear'} Nota
        </Button>
      </Box>
    </form>
  );
}

export default NoteForm;