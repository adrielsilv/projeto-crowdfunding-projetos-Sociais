document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  document.querySelectorAll("nav ul li a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  const projectsContainer = document.getElementById("projects-container");
  const loadMoreButton = document.getElementById("load-more-projects");
  let projectsLoaded = 0;
  const projectsPerLoad = 4;

  fetch("/data/projects.json")
    .then((response) => response.json())
    .then((data) => {
      const loadProjects = () => {
        const projectsToLoad = data.slice(
          projectsLoaded,
          projectsLoaded + projectsPerLoad
        );
        projectsToLoad.forEach((project) => {
          const card = document.createElement("div");
          card.classList.add("project-card");
          card.innerHTML = `
              <h3>${project.title}</h3>
              <p>${project.description}</p>
              <button class="donate" data-id="${project.id}">Doar</button>
            `;
          projectsContainer.appendChild(card);
        });
        projectsLoaded += projectsPerLoad;
        if (projectsLoaded >= data.length) {
          loadMoreButton.style.display = "none";
        }
      };
      loadProjects();
      loadMoreButton.addEventListener("click", loadProjects);
    })
    .catch((error) => console.error("Erro ao carregar projetos:", error));

  projectsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("donate")) {
      const projectId = e.target.getAttribute("data-id");
      alert(`Obrigado por apoiar o projeto ID: ${projectId}!`);
    }
  });

  const testimonialsContainer = document.getElementById(
    "testimonials-container"
  );
  fetch("/data/testimonials.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((testimonial) => {
        const testimonialDiv = document.createElement("div");
        testimonialDiv.classList.add("testimonial");
        testimonialDiv.innerHTML = `
            <p>"${testimonial.message}"</p>
            <h4>- ${testimonial.author}</h4>
          `;
        testimonialsContainer.appendChild(testimonialDiv);
      });
    })
    .catch((error) => console.error("Erro ao carregar depoimentos:", error));

  const faqContainer = document.getElementById("faq-container");
  fetch("/data/faqs.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((faq) => {
        const faqItem = document.createElement("div");
        faqItem.classList.add("faq-item");
        faqItem.innerHTML = `
            <h3>${faq.question}</h3>
            <p>${faq.answer}</p>
          `;
        faqContainer.appendChild(faqItem);
      });

      document.querySelectorAll(".faq-item h3").forEach((question) => {
        question.addEventListener("click", () => {
          const parent = question.parentElement;
          parent.classList.toggle("active");
        });
      });
    })
    .catch((error) => console.error("Erro ao carregar FAQs:", error));

  fetch("/data/projects.json")
    .then((response) => response.json())
    .then((projects) => {
      document.getElementById("total-projetos").textContent = projects.length;
      const totalDoacoes = projects.reduce(
        (acc, project) => acc + project.donations,
        0
      );
      const totalBeneficiados = projects.reduce(
        (acc, project) => acc + project.beneficiaries,
        0
      );
      document.getElementById("total-doacoes").textContent = totalDoacoes;
      document.getElementById("total-beneficiados").textContent =
        totalBeneficiados;
    })
    .catch((error) => console.error("Erro ao carregar estatísticas:", error));

  const registerButton = document.getElementById("register");
  registerButton.addEventListener("click", () => {
    alert("Cadastro pendente");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transform = "scale(1)";
          entry.target.style.opacity = "1";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document
    .querySelectorAll(".project-card, .testimonial, .faq-item, .stat, .step")
    .forEach((el) => {
      el.style.transform = "scale(0.95)";
      el.style.opacity = "0";
      observer.observe(el);
    });
});
