import "./Container.css";
const Container = (props) => {
  return (
    <div className="Container">
      <h1 className="header">Country quiz</h1>
      {props.children}
      <footer>
        created by{" "}
        <a href="https:github.com/OlayinkaAtobiloye">Olayinka Atobiloye</a> -
        devChallenges.io
      </footer>
    </div>
  );
};

export default Container;
