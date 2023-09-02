import "./Avatar.scss";
const Avatar =({
avatar_source,
  avatar_alt
}) =>{
  return <img src={avatar_source} alt={avatar_alt}></img>;
}

export default Avatar
  