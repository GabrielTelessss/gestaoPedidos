import React, { useState } from 'react';

function Pedido({ pedido, setPedido, produtos, onAdicionarAoPedido, onFinalizarPedido }) {
  const [pedidoAberto, setPedidoAberto] = useState(false);
  const [endereco, setEndereco] = useState({
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: ''
  })

  const [mostrarFormEndereco, setMostrarFormEndereco] = useState(false)

  const removerDoPedido = (id) => {
    setPedido(pedido.filter(item => item.id !== id));
  };

  const alterarQuantidade = (id, novaQuantidade) => {
    if (novaQuantidade > 0) {
      setPedido(pedido.map(item =>
        item.id === id ? { ...item, quantidade: novaQuantidade } : item
      ));
    } else {
      removerDoPedido(id);
    }
  };

  const iniciarNovoPedido = () => {
    setPedidoAberto(true);
    setPedido([]);
  };

  const handleEnderecoChage = (e) => {
    setEndereco({ ...endereco, [e.target.name]: e.target.value })
  }
  const buscarCep = async () =>{
    if(endereco.cep.length !== 8){
      alert('CEP inválido')
      return
    }

    try{
      const response = await fetch(`https://viacep.com.br/ws/${endereco.cep}/json/`)
      const data = await response.json()

      if(data.erro){
        alert('CEP não encontrado')
        return
      }

      setEndereco({
        ...endereco,
        rua: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        uf: data.uf
      })
    }catch(erro){
      console.error('Erro ao Buscar CEP', error)
      alert('Erro ao buscar CEP. Tente novamente')
    }
  }

  const finalizarPedido = () => {
    if (pedido.length > 0) {
      if (endereco.cep && endereco.rua && endereco.numero && endereco.bairro && endereco.cidade && endereco.uf) {
        onFinalizarPedido(endereco);
        setPedidoAberto(false);
        setPedido([]);
        setMostrarFormEndereco(false);
        setEndereco({cep: '', rua: '', numero:'', bairro:'', cidade:'', uf: ''});
      } else {
        alert("Por favor, preencha todos os campos do endereço");
      }
    } else {
      alert("Não é possível finalizar um pedido vazio.");
    }
  };

  const total = pedido.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

  return (
    <div className="pedido-container">
      {!pedidoAberto ? (
        <div className="novo-pedido-container">
          <h2>Gerenciamento de Pedidos</h2>
          <button 
            onClick={iniciarNovoPedido}
            className="botao-novo-pedido"
          >
            Iniciar Novo Pedido
          </button>
        </div>
      ) : (
        <>
          <div className="pedido-header">
            <h2>Pedido em Andamento</h2>
            {!mostrarFormEndereco && (
              <button 
                onClick={() => setMostrarFormEndereco(true)}
                className="botao-finalizar"
              >
                Finalizar Pedido
              </button>
            )}
          </div>

          <div className="produtos-disponiveis">
            <h3>Produtos Disponíveis</h3>
            <ul>
              {produtos.map((produto) => (
                <li key={produto.id} className="produto-item">
                  <div className="produto-info">
                    <span>{produto.nome}</span>
                    <span> - R$ {produto.preco.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => onAdicionarAoPedido(produto)}
                    className="botao-adicionar"
                  >
                    Adicionar ao Pedido
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="pedido-atual">
            <h3>Itens do Pedido</h3>
            {pedido.length === 0 ? (
              <p>Nenhum item adicionado ao pedido.</p>
            ) : (
              <>
                <ul>
                  {pedido.map((item) => (
                    <li key={item.id} className="pedido-item">
                      <div className="produto-info">
                        <span>{item.nome}</span>
                        <span> - R$ {item.preco.toFixed(2)}</span>
                      </div>
                      <div className="quantidade-controle">
                        <button onClick={() => alterarQuantidade(item.id, item.quantidade - 1)}>-</button>
                        <span>{item.quantidade}</span>
                        <button onClick={() => alterarQuantidade(item.id, item.quantidade + 1)}>+</button>
                      </div>
                      <div className="item-total">
                        Total: R$ {(item.preco * item.quantidade).toFixed(2)}
                      </div>
                      <button 
                        onClick={() => removerDoPedido(item.id)} 
                        className="botao-remover"
                      >
                        Remover
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="pedido-total">
                  <strong>Total do Pedido: R$ {total.toFixed(2)}</strong>
                </div>
              </>
            )}
          </div>

          {mostrarFormEndereco && (
            <div className="form-endereco">
              <h3>Endereço de Entrega</h3>
              <input 
                type="text"
                name="cep"
                value={endereco.cep}
                onChange={handleEnderecoChage}
                onBlur={buscarCep}
                placeholder="CEP"
                required

              />
              <input
                type="text"
                name="rua"
                value={endereco.rua}
                onChange={handleEnderecoChage}
                placeholder="Rua"
                required
              />
              <input
                type="text"
                name="numero"
                value={endereco.numero}
                onChange={handleEnderecoChage}
                placeholder="Número"
                required
              />
              <input
                type="text"
                name="bairro"
                value={endereco.bairro}
                onChange={handleEnderecoChage}
                placeholder="Bairro"
                required
              />
              <input
                type="text"
                name="cidade"
                value={endereco.cidade}
                onChange={handleEnderecoChage}
                placeholder="Cidade"
                required
              />
              <button onClick={finalizarPedido} className="botao-finalizar">
                Confirmar Pedido
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Pedido;