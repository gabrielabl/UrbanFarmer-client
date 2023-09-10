import "./Loading.scss";
import LoadingButton from "@mui/lab/LoadingButton";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Loading = () => {
  return (
    <div>
      <Header />
      <div className="loading-page">
        <p>LOADING...</p>
        <LoadingButton loading={true} />
      </div>
      <Footer />
    </div>
  );
};

export default Loading;
