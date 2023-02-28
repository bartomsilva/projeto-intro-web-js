
// converte valor monetário para nossa moeda com ou sem símbolo
const moedaBrasil = (valor, simbolo) => {
    if (simbolo) {
        return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }
    //sem R$
    return valor.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// BLOQUEIO DE TECLAS POR TIPOS - TODAS, LETRAS, NÚMEROS
const rejectAll = (e) => {
    e.preventDefault()
}

const rejectChar = (e) => {
    if (! +e.key) e.preventDefault()
}

const rejectNumber = (e) => {
    if (+e.key) e.preventDefault()
}

// reseta valor do input
const resetInput=(event)=>{
    if (event) event.target.value=''
}

// reseta o form
const resetForm=(e)=>{
    e.reset()

}
// JANELA DE AVISOS
const modal = (title, text,success) => {
    if(!success){ 
        swal(title, text, "error")
    } else {
        swal(title, text, "success")
    }
}

// creditos hora de codar Matheus Batisti
// está função não foi feita por mim ( regex em estudo ) 
// mas entendo o regex que foi feito.
const validateEmail = (email) => {
    // const email = e.target.value
    var re = /\S+@\S+\.\S+/
    if (!re.test(email)) {
        // e.target.value = ''
        // modal('Atenção...', 'Digite um e-mail válido!')
        return false
    }
    return true
}

// FORM  CONTAT
const sendMessage = (event) => {

    $name = document.getElementById('name').value
    $email = document.getElementById('email').value
    $message = document.getElementById('message').value

    if (!$name || $name.length<10) {
        modal('Atenção', 'O nome precisa ser preenchido com no mínimo 10 caracteres!')
        return
    }
    if (!validateEmail($email)) {
        modal('Atenção', 'Digite um e-mail válido!')
        return
    }
    if (!$message || $message.length<10) {
        modal('Atenção', 'A mensagem precisa ter no mínimo 10 caracteres!')
        return
    }
   
    resetForm(event.target.parentNode)
    modal('Obrigado!','Breve, entraremos em contato.',true)

}
// GRAVA MATRICULA DO ALUNO NO LOCALSTORAGE
const recordDBlocalStorage = (p1, p2, p3, p4, p5, p6, p7, p8) => {
    const estudante = p1
    const turma = p2
    const curso = p3
    const valor = p4
    const nParcelas = p5
    const desconto = p6
    const vDesconto = p7
    const parcelas = p8

    const obj = '{"estudante":' + '"' + estudante + '"' + ',' +
        '"turma":' + '"' + turma + '"' + ',' +
        '"curso":' + '"' + curso + '"' + ',' +
        '"valor":' + '"' + valor + '"' + ',' +
        '"nParcelas":' + nParcelas + ',' +
        '"desconto":' + desconto + ',' +
        '"vDesconto":' + vDesconto + ',' +
        '"parcelas":' + + parcelas + '}'

    if (typeof (Storage) != 'undefined') {

        if (!localStorage.proInicio) {
            if (localStorage.newAluno) {
                localStorage.removeItem('newAluno')
            }
            localStorage.proInicio = 'projeto LabEscola iniciado'
        }
        if (!localStorage.newAluno) {
            localStorage.newAluno = obj
        } else {
            localStorage.newAluno += "#" + obj
        }
    }
}

// LÊ ALUNOS MATRICULADOS QUE ESTÃO NO LOCALSTORAGE

const readBDlocalStorage = (array) => {
    if (typeof (Storage) === 'undefined' ||
        !localStorage.proInicio ||
        !localStorage.newAluno) return
    let records = localStorage.newAluno
    records = records.split('#')
    records.forEach(e => {
        array.push(JSON.parse(e))
    })
}

// remove do localStorage os dados dos Alunos

const resetLocalStorage = (event) => {
    event.preventDefault()
    if (typeof (Storage) === 'undefined' ||
        !localStorage.proInicio ||
        !localStorage.newAluno) {
        modal('Atenção!', 'No momento não há registros locais.')
        return
    }
    localStorage.removeItem('newAluno')
    localStorage.removeItem('proInicio')
    modal('Sucesso!', "Todos registros locais de alunos foram removidos.",true)
}



  
