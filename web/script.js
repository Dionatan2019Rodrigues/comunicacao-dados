var vetor = []
var res = document.querySelector('div#res')


function adicionar(){
    var n = document.getElementById('num')
    var tab = document.getElementById('selc')
    
    if(n.value.length == 0){
        alert('Valor não digitado.')
    }else{
        if((Number(n.value) > 100)||(Number(n.value) < 1)){
            alert('Valor inválido.')
        }else{
            if((vetor.indexOf(Number(n.value))) != -1){
                alert('Valor ja existe na lista.')
            }else{
                vetor.push(Number(n.value))
                vetor.sort()
                tab.innerHTML = ''
                for(var i=0;i < vetor.length;i++){
                    var item = document.createElement('option')
                    item.text = `Valor ${vetor[i]} Adicionado`
                    item.value = `tab${i}`
                    tab.appendChild(item)
                    res.innerHTML = ''
                }
            }
        }
    }
    num.value = ''
    num.focus()
}
function maximo(l){
    var max = l[0]
    for(var i in l){
        if(l[i] > max)
            max = l[i]      
    }
    return max
}
function minimo(l){
    var min = l[0]
    for(var i in l){
        if(l[i] < min)
            min = l[i]
    }
    return min
}
function soma(l){
    var soma = 0

    for(var i in l){
        soma += l[i]
    }
    return soma
}
function media(){
    return soma(vetor)/vetor.length
}
function validar(){

    if(vetor.length == 0){
        alert('Adicione valores antes de finalizar.')
    }else{
        res.innerHTML = ''
        res.innerHTML += `<p>Ao total temos ${vetor.length} valores.</p>`
        res.innerHTML += `<p>O maior valor encontrado foi ${maximo(vetor)}</p>`
        res.innerHTML += `<p>O menor valor encontrado foi ${minimo(vetor)}</p>`
        res.innerHTML += `<p>Somando todos valores, temos ${soma(vetor)}</p>`
        res.innerHTML += `<p>A média dos valores é ${media()}</p>`
    }
}