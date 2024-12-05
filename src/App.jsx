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
import AddCategoryPage from "./pages/categories/AddCategoryPage";
import EditCategoryPage from "./pages/categories/EditCategoryPage";
import AttributesPage from "./pages/attributes/AttributesPage";
import AddAttributePage from "./pages/attributes/AddAttributePage";
import AddAttributeValuePage from "./pages/attributes/attributeValue/AddAttributeValuePage";
import EditAttributePage from "./pages/attributes/EditAttributePage";
import EditAttributeValuePage from "./pages/attributes/attributeValue/EditAttributeValuePage";

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
              {/* user pages */}
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/:id" element={<EditUserPage />} />
              <Route path="/users/create" element={<AddUserPage />} />

              {/* category pages */}
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/categories/:id" element={<EditCategoryPage />} />
              <Route path="/categories/create" element={<AddCategoryPage />} />

              {/* attribute pages */}
              <Route path="/attributes" element={<AttributesPage />} />
              <Route path="/attributes/:id" element={<EditAttributePage />} />
              <Route path="/attributes/create" element={<AddAttributePage />} />
              {/* attribute values pages */}
              <Route path="/attribute-values/create/:id" element={<AddAttributeValuePage />} />
              <Route path="/attribute-values/:id" element={<EditAttributeValuePage/>} />

            </Route>
          </Routes>
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
