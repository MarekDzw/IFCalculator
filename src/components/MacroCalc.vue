<template>
  <div>
    <v-container class="grey lighten-5">
      <v-row>
        <v-col cols="12" md="3">
          <v-card class="pa-2" outlined tile>
            <v-card-title>Schedule</v-card-title>
            <v-text-field
              @change="pieChart(svg, asd), pieChart(svg1, asd1)"
              type="number"
              value="7"
              label="Days per cycle"
            />
            <v-text-field type="number" value="2" label="Workouts per cycle" />
          </v-card>
        </v-col>
        <v-col cols="6" md="9">
          <v-card class="pa-2" outlined tile>
            <v-card-title>Summary</v-card-title>
            <v-card-text>Cycle TEE: tdee * dayPerCycle kcal</v-card-text>
            <v-card-text>TDEE: TDEE kcal</v-card-text>
            <v-card-text
              >Cycle Calories: (tdee * x%) + (tdee * x%) * x kcal</v-card-text
            >
            <v-card-text
              >Cycle Over/Under: cycleTEE - cycleCalories kcal</v-card-text
            >
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="pa-2" outlined tile>
            <div id="chart"></div>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="pa-2" outlined tile>
            <div id="chart1"></div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-container class="d-flex justify-center">
      <v-btn color="primary" @click="updatePage(4)">Next step</v-btn>
    </v-container>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'MacroCalc',
  data() {
    return {
      svg: '#chart',
      asd: [
        { name: 'Proteins', value: 30 },
        { name: 'Carbo', value: 20 },
        { name: 'Fat', value: 50 },
      ],
      svg1: '#chart1',
      asd1: [
        { name: 'Proteins', value: 60 },
        { name: 'Carbo', value: 20 },
        { name: 'Fat', value: 20 },
      ],
    };
  },
  methods: {
    pieChart(selector, data) {
      const size = 500;
      const fourth = size / 4;
      const half = size / 2;
      const labelOffset = fourth * 1.4;
      const total = data.reduce((acc, cur) => acc + cur.value, 0);
      const container = d3.select(selector);

      const chart = container
        .append('svg')
        .style('width', '100%')
        .attr('viewBox', `0 0 ${size} ${size}`);

      const plotArea = chart
        .append('g')
        .attr('transform', `translate(${half}, ${half})`);

      const color = d3
        .scaleOrdinal()
        .domain(data.map((d) => d.name))
        .range(d3.schemeCategory10);
      const pie = d3
        .pie()
        .sort(null)
        .value((d) => d.value);

      const arcs = pie(data);

      const arc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(fourth);

      const arcLabel = d3
        .arc()
        .innerRadius(labelOffset)
        .outerRadius(labelOffset);

      plotArea
        .selectAll('path')
        .data(arcs)
        .enter()
        .append('path')
        .attr('fill', (d) => color(d.data.name))
        .attr('stroke', 'white')
        .attr('d', arc)
        .style('transform', 'scale(2)');

      const labels = plotArea
        .selectAll('text')
        .data(arcs)
        .enter()
        .append('text')
        .style('text-anchor', 'middle')
        .style('alignment-baseline', 'middle')
        .style('font-size', '20px')
        .attr('transform', (d) => `translate(${arcLabel.centroid(d)})`);

      labels
        .append('tspan')
        .attr('y', '0.6em')
        .attr('x', 0)
        .style('font-weight', 'bold')
        .text((d) => `${d.data.name}`);

      labels
        .append('tspan')
        .attr('y', '-0.6em')
        .attr('x', 0)
        .text(
          (d) =>
            `${d.data.value} (${Math.round((d.data.value / total) * 100)}%)`
        );
    },
  },
};
</script>
<style lang="scss"></style>
