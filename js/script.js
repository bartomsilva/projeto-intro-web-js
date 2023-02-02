

const resetLocal=document.getElementById("resetLocalStorage")
if(resetLocal){
    resetLocal.addEventListener('click',(event)=>resetLocalStorage(event))
}

// VALORES DOS CURSOS
let carrinhoCursos = []

//////////////
// MEUS CURSOS
//////////////
const meusCursos = [
    {
        curso: "HTML e CSS",
        descricao: "Dê os primeiros passos no mundo DEV.",
        duracao: "1 mês",
        valor: 500.00
    },
    {
        curso: "JavaScript",
        descricao: "Venha aprender programação.",
        duracao: "2 meses",
        valor: 900.00
    },
    {
        curso: "APIsRest",
        descricao: "Venha se aprofundar no universo Dev Web Full Stack",
        duracao: "6 meses",
        valor: 2000.00
    },
]
////////////////
// MINHAS TURMAS
//////////////// 
const minhasTurmas = [
    {
        turma: "Hipátia",
        curso: "JavaScript",
        inicio: "30/11/2022",
        termino: "30/01/2023",
        numeroAlunos: 150,
        periodo: "Noturno",
        concluida: false
    },
    {
        turma: "Sibyla",
        curso: "JavaScript",
        inicio: "30/10/2022",
        termino: "30/12/2022",
        numeroAlunos: 200,
        periodo: "Integral",
        concluida: false
    },
    {
        turma: "Curie",
        curso: "HTML e CSS",
        inicio: "15/09/2022",
        termino: "15/10/2022",
        numeroAlunos: 180,
        periodo: "Noturno",
        concluida: true
    },
    {
        turma: "Zhenyi",
        curso: "HTML e CSS",
        inicio: "01/11/2022",
        termino: "01/01/2023",
        numeroAlunos: 80,
        periodo: "Integral",
        concluida: false
    },
    {
        turma: "Clarke",
        curso: "HTML e CSS",
        inicio: "04/07/2022",
        termino: "04/09/2022",
        numeroAlunos: 200,
        periodo: "Noturno",
        concluida: true
    },
    {
        turma: "Blackwell",
        curso: "APIsRest",
        inicio: "20/03/2022",
        termino: "20/06/2022",
        numeroAlunos: 100,
        periodo: "Integral",
        concluida: true
    },
    {
        turma: "Elion",
        curso: "APIsRest",
        inicio: "12/01/2022",
        termino: "12/06/2022",
        numeroAlunos: 200,
        periodo: "Noturno",
        concluida: true
    },
    {
        turma: "Burnell",
        curso: "APIsRest",
        inicio: "18/10/2022",
        termino: "18/04/2023",
        numeroAlunos: 90,
        periodo: "Integral",
        concluida: false
    },
]
/////////////
// ESTUDANTES 
/////////////
const estudantes = [
    {
        estudante: "Chris Evans",
        turma: "Hipátia",
        curso: "JavaScript",
        valor: "900.00",
        nParcelas: 9,
        desconto: false,
        vDesconto: 0,
        parcelas: 100.00
    },
    {
        estudante: "Halle Berry ",
        turma: "Burnell",
        curso: "APIsRest",
        valor: "2000.00",
        nParcelas: 4,
        desconto: false,
        vDesconto: 0,
        parcelas: 500.00
    },

    {
        estudante: "Lashana Lynch",
        turma: "Zhenyi",
        curso: "HTML e CSS",
        valor: "500.00",
        nParcelas: 1,
        desconto: false,
        vDesconto: 0,
        parcelas: 500.00
    },
]

/////////////////
// FUNÇÕES BUSCAR
/////////////////
// COURSE - CURSOS
const buscarCurso = (nomecurso) => {
    nomecurso = nomecurso.toLowerCase().trim()
    const result = meusCursos.find(el => el.curso.toLowerCase().includes(nomecurso))
    if (typeof result == "undefined") modal('Atenção','Curso não encontrado!')
    return result

}
// CLASS - TURMAS
const buscarTurma = (nometurma) => {
    nometurma = nometurma.toLowerCase().trim()
    const result = minhasTurmas.filter(obj => obj.turma.toLowerCase().includes(nometurma))
    if (result.length === 0) modal('Atenção','Turma não encontrada!')
    return result
}
// STUDENT - ESTUDANTE
const buscarEstudante = (nomeestudante) => {
    nomeestudante = nomeestudante.toLowerCase()
    const result = estudantes.find(obj => obj.estudante.toLowerCase().includes(nomeestudante))
    if (typeof result == "undefined") modal('Atenção',"Aluno não encontrado!")
    return result
}

/////////////
// MATRICULAR
/////////////
const matricular = (nome, curso, turma, npar) => {
    const objC = buscarCurso(curso)
    const dadosOk = typeof nome == "string" && typeof curso == "string" &&
        typeof turma == "string" && typeof npar == "number"
    if (!dadosOk) {
        modal("Dados inválidos, favor verificar!!!")
        return false
    }

    const valDesconto = objC.valor * (npar <= 2 ? 0.2 : 0)
    const valLiquido = objC.valor - valDesconto

    estudantes.push(
        {
            estudante: nome,
            turma: turma,
            curso: curso,
            valor: valLiquido.toFixed(2).toString(),  // com desconto    
            nParcelas: npar,
            desconto: npar <= 2,
            vDesconto: valDesconto.toFixed(2),
            parcelas: (valLiquido / npar).toFixed()
        }   
    )
    // salvar dados no localStorage
    recordDBlocalStorage(nome,turma,curso,valLiquido.toFixed(2).toString(),
    npar,(npar<=2),valDesconto.toFixed(2),(valLiquido / npar).toFixed())    
    return true
}

/////////////////
// PARCELAR CURSO
///////////////// 
const parcelarCurso = () => {

    let percDesc = 0
    let desconto = 0
    let valorPagar = 0
    let valorTotal = 0
    let valorParcela = 0
    let textoDesconto = ""
    let nParcelas = +document.getElementById('finan-parc').value

    if(carrinhoCursos.length<1 || nParcelas <=0){
        modal('Atenção',"Dados inválidos ou incompletos.")
        return
    }
    // reseta o valor do campo curso selecionado
    document.getElementById('finan-course').value=''

    // CALCULOS DOS DESCONTOS
    if (carrinhoCursos.length === 3) {
        percDesc = 15
        textoDesconto = "Desconto 15%(ref.3 cursos)"
    } else if (carrinhoCursos.length === 2) {
        percDesc = 10
        textoDesconto = "Desconto 10%(ref.2 cursos)"
    }

    valorTotal = carrinhoCursos.reduce((total, atual) => total += atual, 0)

    valorPagar = valorTotal
    // desconto por quantidade de cursos
    if (percDesc > 0) {
        desconto += (valorPagar * percDesc / 100)
    }
    // desconto especial por número de parcelas
    if (nParcelas < 3 && nParcelas > 0) {
        desconto += (valorPagar * 20 / 100)
        textoDesconto += textoDesconto != "" ? `<br/>`+"concedido + 20% de desconto" : "foi concedido 20% de desconto"
    }
    valorPagar -= desconto
    valorParcela = valorPagar / nParcelas

    // de ${moedaBrasil(valorParcela, true)} ${nParcelas < 3 ? " (concedido 20% de desconto)" : ""}`


    const result = 
    `O valor do pagamento é de ${moedaBrasil(valorPagar, true)}, 
    <p></p>${nParcelas} ${nParcelas > 1 ? "Parcelas" : "Parcela"}
    de ${moedaBrasil(valorParcela, true)} <br/> ${textoDesconto}`
    
    const result2 = `Valor total s/desconto: ${moedaBrasil(valorTotal,true)} <p></p>
    Valor do desconto: ${moedaBrasil(desconto,true)}
    `       
    document.getElementById('c-finan-resu-desc2').innerHTML=result
    document.getElementById('c-finan-resu-desc3').innerHTML=result2

}

////////////////////////////////
// ADICIONAR VALORES NO CARRINHO
////////////////////////////////
const adicionarCarinhoCursos = () => {

    const nomeCurso = document.getElementById("finan-course")
    const objCurso = buscarCurso(nomeCurso.value)
    const courses=document.getElementById('c-finan-resu-desc1')

    if(!nomeCurso.value){
        modal("Atenção","é preciso selecionar um curso para poder adicionar!")
        return
    }
    
    if(courses.innerHTML.includes(nomeCurso.value)){
        modal('Atenção','esse curso já foi incluído no carrinho!')
        document.getElementById("finan-course").value=""
        return
    }

    if (typeof objCurso === "object") {
        courses.innerHTML+='» '+nomeCurso.value+`<p></p>`
        carrinhoCursos.push(objCurso.valor)
    } else {
        modal('Atenção','Ocorreu um erro!!!')
    }
    document.getElementById("finan-course").value=""
}

//////////////////////////
/// ALTERA VALOR DO CURSO
const alterarValorDosCursos = (curso, novoValor) => {
    meusCursos.forEach((item) => {
        if (item.curso.toLowerCase() === curso.toLowerCase()) {
            item.valor = novoValor
        }
    })
    console.log(meusCursos)
}

//  MONTAGEM DOS CARDS DAS TURMAS - AREA ADM
function gerarCard() {
    let result = "full"
    let div = null
    let title = null
    let legend = null
    let text = null

    const $class = document.querySelector("#inp-class").value;

    // recria a div dos cards
    document.getElementById('classes').remove()
    div = document.createElement("div")
    div.setAttribute("id", "classes")
    document.querySelector("#adm-class").appendChild(div)

    if ($class != "* Todas") {
        result = buscarTurma($class)
    } else {
        result = minhasTurmas
    }

    document.querySelector("#classes").classList.add("gridfull")

    document.querySelector("#inp-class").value = ""

    if (result.length == 0) {
        return
    }

    // ordena os nomes ds turmas
    result.sort((a, b) => {
        const classA = a.turma.toUpperCase()
        const classB = b.turma.toUpperCase()
        if (classA < classB) {
            return -1
        }
        if (classA > classB) {
            return 1
        }
        return 0
    }).forEach(e => {
        addCard(e.turma, e.curso, e.inicio, e.termino, e.numeroAlunos, e.periodo, e.concluida)
    })
}

//  ADDCARD - template dos CARDS
function addCard(xTurma, xCurso, xInicio, xTermino, xNumAlunos, xPeriodo, xConcluido) {
    const $cards = document.getElementById('classes')
    const html =
        `
            <div>
                <p class="class-tit">${xTurma}</p>
                <span class='class-text-bold'>Curso:</span><span class='class-text'>${xCurso}</span>
                <span class='class-text-bold'>Inicio:</span><span class='class-text'>${xInicio}</span>
                <span class='class-text-bold'>Término:</span><span class='class-text'>${xTermino}</span>
                <span class='class-text-bold'>Número de Alunos:</span><span class='class-text'>${xNumAlunos}</span>
                <span class='class-text-bold'>Período:</span><span class='class-text'>${xPeriodo}</span>
                <span class='class-text-bold'>Concluído:</span><span class='class-text'>${xConcluido ? "sim" : "não"}</span>
            </div>
        `
    $cards.innerHTML += html
}

 // função para criar as listas 
 function createList(array, list, element) {
    if (!array) return
    // captura a lista que será preenchida
    // const listContent = document.getElementById(list)
    const listContent = document.querySelector("#" + list)
    if(!listContent) return
    // reset na lista
    listContent.innerHTML = ''
    if(list.includes('stud')) {
        readBDlocalStorage(estudantes)
    }
    // percorre o array para montar a lista
    array.forEach(e => {
        // adicionando os elementos a lista
        listContent.innerHTML +=
            `<option value="${Object.values(e)[0]}">`
        // lê o valor do primeira chave do objeto 
        // é justamente a chave que contém o nome 
    })
    // caso seja passado limpa o conteúdo
    if (element) element.innerHTML=''
}


// filtro para as turmas abertas e referente
// ao curso selecionado
function filterCourseClass(element) {
    // lê do input o curso selecionado
    nameCourse = document.getElementById('f-course').value
    if (!nameCourse) return
    if(element) element.innerHTML=''
    return minhasTurmas.filter((e) => {
        return (!e.concluida &&
            e.curso.toLowerCase().includes(nameCourse.toLowerCase()))
    })
    // caso seja passado limpa o conteúdo
}

// limpa o input de classe
function resetClass() {
    document.getElementById('class').value = ''
}


