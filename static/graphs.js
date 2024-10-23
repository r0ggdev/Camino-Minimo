fetch("/static/json/data.json")
  .then((response) => response.json())
  .then((data) => {
    const svg = d3.select("#graph-container svg");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    const selectedColor = "orange";
    let selectedNodes = new Set();

    const simulation = d3
      .forceSimulation()
      .force(
        "link",
        d3
          .forceLink()
          .id((d) => d.id)
          .distance(300)
      ) // Aumentar la distancia entre enlaces
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Crear enlaces
    const link = svg
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(data.edges)
      .enter()
      .append("line")
      .attr("class", "link");

    // Crear etiquetas para los pesos
    const linkLabels = svg
      .append("g")
      .attr("class", "link-labels")
      .selectAll("text")
      .data(data.edges)
      .enter()
      .append("text")
      .attr("class", "link-label")
      .attr("text-anchor", "middle")
      .text((d) => d.weight); // Muestra el peso

    // Crear nodos
    const node = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(data.nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .on("click", (event, d) => {
        // Seleccionar/deseleccionar nodo
        if (selectedNodes.has(d.id)) {
          selectedNodes.delete(d.id);
          d3.select(event.currentTarget)
            .select("circle")
            .classed("selected", false);
          d3.select(event.currentTarget)
            .select("circle")
            .attr("fill", "steelblue");
        } else {
          selectedNodes.add(d.id);
          d3.select(event.currentTarget)
            .select("circle")
            .classed("selected", true);
          d3.select(event.currentTarget)
            .select("circle")
            .attr("fill", selectedColor);
        }
      });

    node
      .append("circle")
      .attr("r", 13) // Aumentar el tamaño del nodo para mejor visualización
      .attr("fill", "steelblue");

    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .text((d) => d.label);

    // Iniciar simulación
    simulation.nodes(data.nodes).on("tick", ticked);

    simulation.force("link").links(data.edges);

    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      linkLabels
        .attr("x", (d) => (d.source.x + d.target.x) / 2) // Posición en el medio del enlace
        .attr("y", (d) => (d.source.y + d.target.y) / 2); // Posición en el medio del enlace

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    }

    // Mover nodos
    node.call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Guardar selección
    document.getElementById("saveSelection").onclick = function () {
      const selectedArray = Array.from(selectedNodes);
      console.log("Nodos seleccionados:", selectedArray);
      document.getElementById("grap").innerHTML = selectedArray.join(", ");
    };
  })
  .catch((error) => console.error("Error al cargar el JSON:", error));
