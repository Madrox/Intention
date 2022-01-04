import * as React from "react";
import { Route, Routes } from "react-router";
import { HomeView } from "src/Renderer/views/HomeView";
import { WritingView } from "src/Renderer/views/WritingView/WritingView";

export const GlobalRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<HomeView />} path="/" />
      <Route element={<WritingView />} path="/entry/:subdir/:id" />
    </Routes>
  );
};
