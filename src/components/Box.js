const Box = ({username, img, comment}) => {
return (
    <div>
        <h3>{username}</h3>
        <img src={img}/>
        <p>{comment}</p>
    </div>
)};

export default Box;