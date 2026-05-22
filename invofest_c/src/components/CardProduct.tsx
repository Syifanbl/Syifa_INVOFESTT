interface cardProduct {
    foto:string;
    name:string;
    description:string;
    price:number;
}

const cardProduct : React.FC<cardProduct> = ({foto, name, description, price}) => {
    return (
        <div>
            <img src={foto} alt="" />
            <h3>{name}</h3>
            <p>{description}</p>
            <p>{price}</p>
        </div>
    );
};

export default cardProduct;