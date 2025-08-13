import { Routes, Route, Navigate } from "react-router-dom";
import { CharactersPage } from "./pages/CharactersPage";
import { CharacterDetailPage } from "./pages/CharacterDetailPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/characters" replace />} />
      <Route path="/characters" element={<CharactersPage />} />
      <Route path="/character/:id" element={<CharacterDetailPage />} />
    </Routes>
  );
}