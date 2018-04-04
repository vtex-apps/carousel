import React, { Component } from "react";
import PropTypes from "prop-types";
import Carousel from "./Carousel";
import Banner from "./Banner";

class Test extends Component {
  render() {
    const link1 =
      "http://s3.amazonaws.com/images2.holambrense.com.br/wp-content/uploads/2017/01/linha-glamour-1484760825.png";

    const link2 = 
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT3NRctRMv4rbwzP8dNSXy_bkT_mtimh5_lib6HOL3d1YnEnq7";

    const link3 =
      "https://www.clubedascomadres.com.br/wp-content/uploads/2018/01/Dream-nova-linha-de-splashes-O-Botic%C3%A1rio-Clube-das-Comadres-.jpg";

    const link4 =
      "https://boticario.vteximg.com.br/arquivos/Ciclo_15_Quasar_Quest_Des_Colonia_oq_linha.png?v=635530427378530000";

    return (
      <div className="flex justify-around" style={{marginTop: '20px'}}>
        <div className="w-80">
          <Carousel>
            <Banner heading="Make B" image={link1} />
            <Banner heading="Batom intense Vontades" image={link2} />
            <Banner heading="Batom intense Intensões" image={link3} />
            <Banner heading="Batom intense Loucuras" image={link4} />
          </Carousel>
        </div>
      </div>
    );
  }
}

export default Test;
