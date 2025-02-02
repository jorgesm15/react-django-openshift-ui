// src/components/NoteList.jsx

import { Paper, Typography, Button, Box } from '@mui/material';

function NoteList({ notes, onDelete, onEdit }) {
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/notes/${id}/`, {
        method: 'DELETE',
      });
      onDelete();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {notes.map((note) => (
        <Paper key={note.id} sx={{ p: 2 }}>
          <Typography variant="h6">{note.title}</Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>{note.content}</Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button 
              variant="outlined" 
              size="small"
              onClick={() => onEdit(note)}
            >
              Editar
            </Button>
            <Button 
              variant="outlined" 
              color="error" 
              size="small"
              onClick={() => handleDelete(note.id)}
            >
              Eliminar
            </Button>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}

export default NoteList;