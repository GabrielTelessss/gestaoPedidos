import React, { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import CadastroProduto from './components/CadastroProduto.jsx';
import ListaProdutos from './components/ListaProdutos.jsx';
import Pedido from './components/Pedido.jsx';
import Entregas from './components/Entregas.jsx';
import Relatorios from './components/Relatorios.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [pedidosFinalizados, setPedidosFinalizados] = useState([]);
  const [activeScreen, setActiveScreen] = useState('lista');

  const removerProduto = (id) => {
    setProdutos(produtos.filter(produto => produto.id !== id));
  };

  const adicionarAoPedido = (produto) => {
    const itemExistente = pedido.find(item => item.id === produto.id);
    if (itemExistente) {
      setPedido(pedido.map(item =>
        item.id === produto.id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      ));
    } else {
      setPedido([...pedido, { ...produto, quantidade: 1 }]);
    }
  };

  const finalizarPedido = (endereco) => {
    if (pedido.length > 0) {
      const novoPedido = {
        itens: pedido,
        total: pedido.reduce((acc, item) => acc + (item.preco * item.quantidade), 0),
        endereco: endereco,
        data: new Date()
      };
      setPedidosFinalizados([...pedidosFinalizados, novoPedido]);
      setPedido([]);
    }
  };

  const handleFinalizarEntrega = (index) => {
    setPedidosFinalizados(prevPedidos => 
      prevPedidos.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="App">
      <Header setActiveScreen={setActiveScreen} />
      <main className="main-content">
        {activeScreen === 'cadastro' && (
          <CadastroProduto produtos={produtos} setProdutos={setProdutos} />
        )}
        {activeScreen === 'lista' && (
          <ListaProdutos 
            produtos={produtos} 
            onRemover={removerProduto}
          />
        )}
        {activeScreen === 'pedido' && (
          <Pedido 
            pedido={pedido} 
            setPedido={setPedido} 
            produtos={produtos}
            onAdicionarAoPedido={adicionarAoPedido}
            onFinalizarPedido={finalizarPedido}
          />
        )}
        {activeScreen === 'entregas' && (
          <Entregas 
            pedidosFinalizados={pedidosFinalizados}
            onFinalizarEntrega={handleFinalizarEntrega}
          />
        )}
        {activeScreen === 'relatorios' && (
          <Relatorios 
            produtos={produtos}
            pedidos={pedidosFinalizados}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;