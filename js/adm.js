// carrinho dos cursos
carrinhoCursos = []

// preenche a lista de turmas 
// selectClass('c-class-list')
createList(minhasTurmas, 'c-class-list')

//lista de estudantes
// selectStudent('r-student-list')
createList(estudantes, 'r-student-list')

// efetuar matricula do aluno 
// esta funçaõ testa os dados 
function rMatricular() {
    const stdName = document.getElementById('f-name').value
    const stdCourse = document.getElementById('f-course').value
    const stdClass = document.getElementById('f-class').value
    const stdParc = +document.getElementById('f-installment').value
    document.getElementById("r-result").classList.add('standBy')

    let formOk = 0
    // testa as 4 codições
    if (stdName != '') formOk++
    if (stdCourse != '') formOk++
    if (stdClass != '') formOk++
    if (stdParc > 0) formOk++
    if (formOk < 4) {
        modal('Atenção', "Dados incorretos!")
    } else {
        // estando ok - efetua a matrícula 
        // e mostra os dados de sucesso
        if (matricular(stdName, stdCourse, stdClass, stdParc)) {
            document.getElementById("r-result").classList.toggle('standBy')
            document.getElementById('r-name').textContent = stdName
            document.getElementById('r-course').textContent = stdCourse
            document.getElementById('r-class').textContent = stdClass
        }
        document.getElementById("r-form").reset();
    }
}

// template de Resumo - Estudante
const reportTemplate = (element) => {
    return `<div id="relatorio"> 
        <p>Nome: ${element.estudante}</p>
        <p>Turma: ${element.turma}</p>
        <p>Curso: ${element.curso}</p>
        <p>Valor total: ${moedaBrasil(+element.valor, "br")}</p>
        <p>Valor parcela: ${moedaBrasil(element.parcelas, "br")}</p>
        <p>N. parcelas: ${element.nParcelas}</p>     
    </div>   
        `
}


// ação no botão Buscar estudante 
// relatorio do estudante
const btnBuscar = document.querySelector('#student-btnFind')

if (btnBuscar) {
    btnBuscar.addEventListener('click', function () {

        const obj = document.querySelector('#c-student-resu')
        const name = document.querySelector('#studant-name')
        const found = buscarEstudante(name.value)
        obj.innerHTML = ''

        if (!name.value) {
            modal('Atenção', 'É necessário informar o nome do aluno!')
            return
        }

        if (!found) {
            name.value = ''
            return
        }
        name.value = found.estudante

        obj.innerHTML = reportTemplate(found)
        name.value = ''

    })

}

//  preenche o input ao sair  
function find(e, type, clearClass) {
    // e = input ativo
    // type t = turma / class
    // type e = estudante / student
    // type c = curso / course
    // clearClass = limpa o input de turma (matricula) 
    let result = ''
    const busca = e.target.value
    if (type === 't') {
        result = buscarTurma(busca)
        if (result.length > 0) result = result[0].turma
    } else if (type === 'e') {
        result = buscarEstudante(busca)
        if (result) result = result.estudante
    } else if (type === 'c') {
        if (clearClass) document.getElementById("f-class").value = ""
        result = buscarCurso(busca)
        if (result) result = result.curso
    }
    if (!result) return
    e.target.value = result
}


// clear simulaticon finac / limpa simulação financeira
const resetSimulacao = (full) => {
    if (full) {
        document.getElementById("c-finan-resu-desc1").innerHTML = ''
        carrinhoCursos = []
    }
   
    document.getElementById("finan-course").value =""
    document.getElementById("c-finan-resu-desc2").innerHTML = ''
    document.getElementById("c-finan-resu-desc3").innerHTML = ''
}


