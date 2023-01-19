class Produto {

  constructor() {
    this.id = 1;
    this.arrayProdutos = []; // vai fazer um loopim por todo elemento´
    this.editId = null;
  }

  salvar() {
    let produto = this.lerDados();

    if (this.validarCampo(produto) == true) {
      if (this.editId == null) {
        this.adicionar(produto);
      } else {
        this.atualizar(this.editId, produto);
      }
    }
    this.listaTabela();
    this.cancelar();
  }

  listaTabela() {
    let tbody = document.getElementById('tbody');
    tbody.innerText = '';

    for (let i = 0; i < this.arrayProdutos.length; i++) {
      let tr = tbody.insertRow();

      let td_id = tr.insertCell();
      let td_nome = tr.insertCell();
      let td_placa = tr.insertCell();
      let td_hora = tr.insertCell();
      let td_acoes = tr.insertCell();

      td_id.innerText = this.arrayProdutos[i].id;
      td_nome.innerText = this.arrayProdutos[i].nome;
      td_placa.innerText = this.arrayProdutos[i].placa;
      td_hora.innerText = this.arrayProdutos[i].hora;

      let imgEdit = document.createElement('img');
      imgEdit.src = 'img/editar.png';
      imgEdit.setAttribute('onclick', 'produto.editar(' + JSON.stringify(this.arrayProdutos[i]) + ')');



      let imgApagar = document.createElement('img');
      imgApagar.src = 'img/cruz.png';
      imgApagar.setAttribute('onclick', 'produto.deletar(' + this.arrayProdutos[i].id + ')');

      td_acoes.appendChild(imgEdit);
      td_acoes.appendChild(imgApagar);

    }
  }

  adicionar(produto) {
    this.arrayProdutos.push(produto);
    this.id++;
  }

  atualizar(id, produto) {
    for (let i = 0; i < this.arrayProdutos.length; i++) {
      if (this.arrayProdutos[i].id == id) {
        this.arrayProdutos[i].nome = produto.nome;
        this.arrayProdutos[i].placa = produto.placa;
        this.arrayProdutos[i].hora = produto.hora;

      }
    }
  }

  editar(dados) {
    this.editId = dados.id;

    document.getElementById('nome').value = dados.nome;
    document.getElementById('placa').value = dados.placa;
    document.getElementById('hora').value = dados.hora;

    document.getElementById('btn1').innerText = 'Atualizar';
  }

  lerDados() {
    let produto = {}

    produto.id = this.id; // vai começar por 1
    produto.nome = document.getElementById('nome').value; // tudo que usuario escrever vou pegar o valor
    produto.placa = document.getElementById('placa').value;
    produto.hora = document.getElementById('hora').value;


    return produto;
  }


  validarCampo(produto) {
    let msg = '';

    if (produto.nome == '') { // se esse campo estiver vazio
      msg += '- Inform o nome do Cliente \n';
    }

    if (produto.placa == '') { // se esse campo estiver vazio
      msg += '- Informe a placa do carro \n';
    }

    if (produto.hora == '') { // se esse campo estiver vazio
      msg += '- Informe a hora  \n';
    }

    if (msg != '') { // se for diferente de vazio
      alert(msg);
      return false
    }
    return true;
  }

  cancelar() {
    document.getElementById('nome').value = '';
    document.getElementById('placa').value = '';
    document.getElementById('hora').value = '';

    document.getElementById('btn1').innerText = 'Salvar'
    this.editId = null;
  }

  deletar(id) {
    if (confirm('Deseja realmente deletar esse cliente id' + id)) {
      let tbody = document.getElementById('tbody');

      for (let i = 0; i < this.arrayProdutos.length; i++) {
        if (this.arrayProdutos[i].id == id) {
          this.arrayProdutos.splice(i, 1);
          tbody.deleteRow(i);
        }
      }
      console.log(this.arrayProdutos);
    }
  }
}

var produto = new Produto();