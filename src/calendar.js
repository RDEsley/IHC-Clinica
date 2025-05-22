// Agentamento do Calendário / Pag Home

const calendarBody = document.getElementById('calendar-body');
const monthYearLabel = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const info = document.getElementById('agendamento-info');

let today = new Date();
let selectedDate = null;
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function renderCalendar(month, year) {
  const firstDay = new Date(year, month).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendarBody.innerHTML = '';
  monthYearLabel.textContent = `${new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(new Date(year, month))}`;

  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');

      if (i === 0 && j < firstDay) {
        cell.textContent = '';
      } else if (date > daysInMonth) {
        break;
      } else {
        cell.textContent = date;

        const cellDate = new Date(year, month, date);
        if (
          cellDate.toDateString() === today.toDateString()
        ) {
          cell.classList.add('today');
        }

        cell.addEventListener('click', () => {
          document.querySelectorAll('.calendar td').forEach(td => td.classList.remove('selected'));
          cell.classList.add('selected');
          selectedDate = cellDate;
          info.textContent = `Você selecionou: ${cellDate.toLocaleDateString('pt-BR')}`;
          localStorage.setItem('agendamentoData', selectedDate.toISOString());
          mostrarHorarios(cellDate);
        });

        date++;
      }
      row.appendChild(cell);
    }

    calendarBody.appendChild(row);
  }
}

prevMonthBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});

// Inicialização
renderCalendar(currentMonth, currentYear);

// Restaura seleção (se houver)
const storedDate = localStorage.getItem('agendamentoData');
if (storedDate) {
  const restoredDate = new Date(storedDate);
  currentMonth = restoredDate.getMonth();
  currentYear = restoredDate.getFullYear();
  renderCalendar(currentMonth, currentYear);
  setTimeout(() => {
    const allCells = calendarBody.querySelectorAll('td');
    allCells.forEach(td => {
      if (td.textContent == restoredDate.getDate()) {
        td.classList.add('selected');
        info.textContent = `Última data selecionada: ${restoredDate.toLocaleDateString('pt-BR')}`;
      }
    });
  }, 100);
}

function mostrarHorarios(data) {
    const horariosSection = document.getElementById("horarios-section");
    const horariosList = document.getElementById("horarios-list");
    const btnConfirmar = document.getElementById("confirmar-agendamento");
    horariosSection.hidden = false;
    horariosList.innerHTML = "";
  
    // Simulação de horários disponíveis
    const horarios = ["08:00", "09:00", "10:30", "14:00", "15:30", "17:00"];
  
    horarios.forEach(horario => {
      const btn = document.createElement("button");
      btn.textContent = horario;
      btn.setAttribute("aria-label", `Agendar às ${horario}`);
      btn.addEventListener("click", () => {
        document.querySelectorAll(".horarios__lista button").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        btnConfirmar.hidden = false;
        localStorage.setItem("horarioSelecionado", horario);
      });
      horariosList.appendChild(btn);
    });
  
    btnConfirmar.onclick = () => {
      const horario = localStorage.getItem("horarioSelecionado");
      alert(`Consulta agendada para ${data.toLocaleDateString("pt-BR")} às ${horario}.`);
    };
  }
  
  // Desenvolvido por Richard Esley / Rafael Furtado / Fernanda Mey / Vitor de Assis / Ryan / Matheus Brandão 