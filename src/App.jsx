import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import Login from "./pages/LoginPage";
import ProtectedRoutes from "./layouts/ProtectedRoutes";
import UsersPage from "./pages/users/UsersPage";
import EditUserPage from "./pages/users/EditUserPage";
import AddUserPage from "./pages/users/AddUserPage";
import AuthContextProvider from "./context/AuthContextProvider";
import CategoriesPage from "./pages/categories/CategoriesPage";
import CategoryAdd from "./features/category/CategoryAdd";
import AddCategoryPage from "./pages/categories/AddCategoryPage";
import EditCategoryPage from "./pages/categories/EditCategoryPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              element={
                <ProtectedRoutes>
                  <AppLayout />
                </ProtectedRoutes>
              }
            >
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/:id" element={<EditUserPage />} />
              <Route path="/users/create" element={<AddUserPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/categories/:id" element={<EditCategoryPage />} />
              <Route path="/categories/create" element={<AddCategoryPage />} />
            </Route>
          </Routes>
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
