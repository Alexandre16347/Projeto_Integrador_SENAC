import Receita from '../Model/Receita';
import User from '../Model/User';

class cards {
  async buscarCard(req, res) {
    // const { user, id } = req.headers;

    // let receita = await Receita.findOne({ _id: String(id) });
    // let usuario = await User.findOne({ _id: String(user) });

    let lista = await Receita.find();

    // *******************************************************************************************************************************************
    // Area Cards

    document.addEventListener('DOMContentLoaded', function () {
        let scrollcard = document.getElementById('scrollcard');
        let area_cards = document.createDocumentFragment();

    // let cards = document.createElement(`div`);
    // cards.setAttribute("class", "scrollcard");

    // ... (código anterior)

    for (let i = 0; i < lista.length; i++) {
      let card = document.createElement(`div`);
      card.setAttribute('class', 'card');

      let div_img = document.createElement('div');
      div_img.setAttribute('class', 'div-img');

      let img_card = document.createElement(`img`);
      img_card.setAttribute('src', `../backend/src/Uploads${lista[i].imagem}`);
      img_card.setAttribute('class', 'img-card');

      div_img.append(img_card);

      card.append(div_img);

      let div_chef = document.createElement('div');
      div_chef.setAttribute('class', 'chef-avatar');

      let img_avatar = document.createElement(`img`);
      img_avatar.setAttribute('src', '../src/media/shumel.jpg');
      img_avatar.setAttribute('class', 'img-avatar');

      div_chef.append(img_avatar);

      card.append(div_chef);

      let txt_card = document.createElement(`button`);
      txt_card.append('Bolo de Cenoura com Cobertura de Chocolate');
      txt_card.setAttribute('class', 'btn-card');

      card.append(txt_card);

      let txt_chef = document.createElement(`a`);
      txt_chef.append('Por Shmebulock');
      txt_chef.setAttribute('href', 'pages/Chefes.html');
      txt_chef.setAttribute('class', 'txt-chef');

      card.append(txt_chef);

      let lb_avaliacao = document.createElement(`label`);
      lb_avaliacao.setAttribute('class', 'lb-avaliacao');
      lb_avaliacao.textContent = '❤ 1.511';

      card.append(lb_avaliacao);

      area_cards.append(card);
    }
  })
}
}

export default new cards();
