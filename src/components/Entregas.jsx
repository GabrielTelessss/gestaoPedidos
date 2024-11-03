import React from "react";

function Entregas({ pedidosFinalizados, onFinalizarEntrega }) {
    const abrirNoGoogleMaps = (endereco) => {
        const enderecoFormatado = `${endereco.rua}, ${endereco.numero}, ${endereco.bairro}, ${endereco.cidade}`
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoFormatado)}`
        window.open(url, '_blank')
    }

    return (
        <div className="entregas-container">
            <h2>Entregas Pendentes</h2>
            {pedidosFinalizados.length === 0 ? (
                <p>Não há entregas pendentes</p>
            ) : (
                <div className="lista-entragas">
                    {pedidosFinalizados.map((pedido, index) => (
                        <div key={index} className="entrega-card">
                            <div className="entrega-header">
                                <h3>Pedido #{index + 1}</h3>
                                <span>Data: {new Date(pedido.data).toLocaleDateString()}</span>
                            </div>
                            <div className="entrega-items">
                                <h4>Itens do Pedido:</h4>
                                <ul>
                                    {pedido.itens.map((item, itemIndex) => (
                                        <li key={itemIndex}>
                                            {item.nome} - {item.quantidade} - R$ {(item.preco * item.quantidade).toFixed(2)}
                                        </li>
                                    ))}
                                </ul>
                                <p className="total">Total: R$ {pedido.total.toFixed(2)}</p>
                            </div>

                            <div className="entrega-endereco">
                                <h4>Endereço de Entrega</h4>
                                <p>
                                    {pedido.endereco.rua}, {pedido.endereco.numero} <br />
                                    {pedido.endereco.bairro}, {pedido.endereco.cidade}
                                </p>
                                <button onClick={() => abrirNoGoogleMaps(pedido.endereco)} className="botao-mapa">
                                    Abrir no Google Maps
                                </button>
                            </div>
                            <button onClick={() => onFinalizarEntrega(index)} className="botao-finalizar-entrega">
                                Finalizar Entrega
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Entregas