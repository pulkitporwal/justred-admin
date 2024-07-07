import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AddSeries from "./pages/AddSeries";
import ViewSeries from "./pages/ViewSeries";
import AddVideo from "./pages/AddVideo";
import ViewVideos from "./pages/ViewVideos";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Unauthorize from "./pages/Unauthorize";
import Video from "./pages/Video";
import Series from "./pages/Series";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/unathorize" element={<Unauthorize />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-series" element={<AddSeries />} />
              <Route path="/view-series" element={<ViewSeries />} />
              <Route path="/add-video" element={<AddVideo />} />
              <Route path="/view-videos" element={<ViewVideos />} />
              <Route path="/video/:videoId" element={<Video />} />
              <Route path="/series/:seriesId" element={<Series />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
