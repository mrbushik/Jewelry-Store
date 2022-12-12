import React from "react";
import { Link } from "react-router-dom";

const MainSuggestions: React.FC = () => {
  return (
    <div>
      <h3 className="text-center px-4 my-4">
        В этом магазине вы сможете найти укращения на любой вкус
      </h3>

      <div className="d-flex justify-content-center px-3">
        <Link to="/mens">
          <img
            className="w-100"
            src="https://static.insales-cdn.com/r/gDO2OXk4Kho/rs:fit:700:700:1/plain/files/1/2049/16304129/original/Frame-1_5cb54a9637e32608ce5fb0d74e8b945a.jpg"
          />
        </Link>
        <Link className="ms-3" to="/woman">
          <img
            className="w-100"
            src="https://static.insales-cdn.com/r/c9ZUsWrkjZk/rs:fit:700:700:1/plain/files/1/2048/16304128/original/Frame_61d5d23905f06c46854c8552ba33ebb8.jpg"
          />
        </Link>
      </div>
      <p className="my-5 px-4">
        Интернет-магазин ювелирных украшений Jewelry Store – это целый мир
        удивительных изделий, оригинальных и неповторимых. Они способны передать
        мысли и чувства, подчеркнуть желания и намерения, сохранить теплые
        воспоминания. Это украшения, которые подойдут для каждого дня, но в то
        же время станут прекрасным дополнением вечернего и торжественного
        образа. Изделия Jewelry Store соединили в себе элегантность классики и самые
        последние тенденции ювелирной моды. Авторские коллекции, смелые модели,
        не имеющие аналогов, неповторимый дизайн и превосходное исполнение – все
        это ювелирный интернет-магазин в Минске, Витебске, Гомеле и других
        городах, модный ювелирный магазин Jewelry Store.
      </p>
    </div>
  );
};

export default MainSuggestions;
