const dataFile = "data/filtered_data.csv";


var columns = {
    "dhbr": "Birth Rate",
    "dhdr": "Death Rate",
    "dhfr": "Fertility Rate",
    "dim": "Mobile Cellular Subscriptions per 100 People",
    "dit": "Telephone Lines",
    "dit100": "Telephone Lines per 100 People",
    "drdal": "Rural Development Agricultural Land",
    "drdap": "Rural Development Agricultural Land Percent",
    "drda": "Rural Development Arable Land",
    "drdp": "Rural Development Arable Land Percent",
    "drdl": "Rural Development Land Area"
};

var keys = {
    'Country': 'country',
    'Year': 'year',
    "Birth Rate": "dhbr",
    "Death Rate": "dhdr",
    "Fertility Rate": "dhfr",
    "Mobile Cellular Subscriptions per 100 People": "dim",
    "Telephone Lines": "dit",
    "Telephone Lines per 100 People": "dit100",
    "Rural Development Agricultural Land": "drdal",
    "Rural Development Agricultural Land Percent": "drdap",
    "Rural Development Arable Land": "drda",
    "Rural Development Arable Land Percent": "drdp",
    "Rural Development Land Area": "drdl"
}

var countries_map = 
    {'Canada': 'ca.png', 
    'Sao Tome and Principe': 'st.png', 
    'Cambodia': 'kh.png', 
    'Ethiopia': 'et.png', 
    'Sri Lanka': 'lk.png', 
    'Swaziland': 'sz.png', 
    'Argentina': 'ar.png', 
    'Bolivia': 'bo.png', 
    'Burkina Faso': 'bf.png', 
    'Bahrain': 'bh.png', 
    'Saudi Arabia': 'sa.png', 
    'Guatemala': 'gt.png', 
    'Guinea': 'gn.png', 
    'St. Lucia': 'lc.png', 
    'Congo, Rep.': 'cg.png', 
    'Spain': 'es.png', 
    'Liberia': 'lr.png', 
    'Maldives': 'mv.png', 
    'Oman': 'om.png', 
    'Tanzania': 'tz.png', 
    'Gabon': 'ga.png', 
    'New Zealand': 'nz.png', 
    'Jamaica': 'jm.png', 
    'Albania': 'al.png', 
    'United Arab Emirates': 'ae.png', 
    'India': 'in.png', 
    'Madagascar': 'mg.png', 
    'Lesotho': 'ls.png', 
    'Turkey': 'tr.png', 'Bangladesh': 'bd.png', 'Solomon Islands': 'sb.png', 'Lebanon': 'lb.png', 'Mongolia': 'mn.png', 'France': 'fr.png', 'Rwanda': 'rw.png', 'Somalia': 'so.png', 'Peru': 'pe.png', 'Vanuatu': 'vu.png', 'Norway': 'no.png', "Cote d'Ivoire": 'ci.png', 'Benin': 'bj.png', 'Cuba': 'cu.png', 'Cameroon': 'cm.png', 'Togo': 'tg.png', 'China': 'cn.png', 'Dominican Republic': 'do.png', 'Germany': 'de.png', 'Ghana': 'gh.png', 'Tonga': 'to.png', 'Indonesia': 'id.png', 'Colombia': 'co.png', 'Libya': 'ly.png', 'Finland': 'fi.png', 'Central African Republic': 'cf.png', 'Sweden': 'se.png', 'Vietnam': 'vn.png', 'Guyana': 'gy.png', 'Kenya': 'ke.png', 'Bulgaria': 'bg.png', 'Mauritius': 'mu.png', 'Romania': 'ro.png', 'Angola': 'ao.png', 'South Africa': 'za.png', 'St. Vincent and the Grenadines': 'vc.png', 'Fiji': 'fj.png', 'Austria': 'at.png', 'Mozambique': 'mz.png', 'Uganda': 'ug.png', 'Japan': 'jp.png', 'Niger': 'ne.png', 'United States': 'us.png', 'Brazil': 'br.png', 'Afghanistan': 'af.png', 'Kuwait': 'kw.png', 'Panama': 'pa.png', 'Mali': 'ml.png', 'Costa Rica': 'cr.png', 'Ireland': 'ie.png', 'Pakistan': 'pk.png', 'Nigeria': 'ng.png', 'Ecuador': 'ec.png', 'Australia': 'au.png', 'Algeria': 'dz.png', 'El Salvador': 'sv.png', 'Chile': 'cl.png', 'Thailand': 'th.png', 'Haiti': 'ht.png', 'Belize': 'bz.png', 'Sierra Leone': 'sl.png', 'Nepal': 'np.png', 'Denmark': 'dk.png', 'Philippines': 'ph.png', 'Portugal': 'pt.png', 'Morocco': 'ma.png', 'Namibia': 'na.png', 'Guinea-Bissau': 'gw.png', 'Kiribati': 'ki.png', 'Switzerland': 'ch.png', 'Grenada': 'gd.png', 'Iraq': 'iq.png', 'Chad': 'td.png', 'Uruguay': 'uy.png', 'Equatorial Guinea': 'gq.png', 'Djibouti': 'dj.png', 'Antigua and Barbuda': 'ag.png', 'Burundi': 'bi.png', 'Cyprus': 'cy.png', 'Barbados': 'bb.png', 'Qatar': 'qa.png', 'Italy': 'it.png', 'Bhutan': 'bt.png', 'Sudan': 'sd.png', 'Singapore': 'sg.png', 'Malta': 'mt.png', 'Netherlands': 'nl.png', 'Suriname': 'sr.png', 'Israel': 'il.png', 'Malaysia': 'my.png', 'Iceland': 'is.png', 'Zambia': 'zm.png', 'Senegal': 'sn.png', 'Papua New Guinea': 'pg.png', 'Malawi': 'mw.png', 'Zimbabwe': 'zw.png', 'Jordan': 'jo.png', 'Poland': 'pl.png', 'Mauritania': 'mr.png', 'Trinidad and Tobago': 'tt.png', 'Hungary': 'hu.png', 'Honduras': 'hn.png', 'Myanmar': 'mm.png', 'Mexico': 'mx.png', 'Tunisia': 'tn.png', 'Nicaragua': 'ni.png', 'Congo, Dem. Rep.': 'cd.png', 'Comoros': 'km.png', 'United Kingdom': 'gb.png', 'Greece': 'gr.png', 'Paraguay': 'py.png', 'Botswana': 'bw.png'}

var rawData;
let selectedRegions = [];
let selectedXAttribute;
let selectedSizeAttribute;
let selectedYear;
let isPlaying = false;
let yearInterval;

function getSelectedRegions() {
    const checkboxes = d3.selectAll("input[type='checkbox']");
    var sel = checkboxes.nodes()
                .map(d => d.value)
                .filter((d, i) => checkboxes.nodes()[i].checked);
    return sel;
}

function selectAllRegions() {
    d3.selectAll(".region-checkbox")
        .property("checked", true);
    selectedRegions = getSelectedRegions();
    createBeeswarm(rawData);
}

function deselectAllRegions() {
    d3.selectAll(".region-checkbox")
        .property("checked", false);
    selectedRegions = [];
    d3.select("#beeswarm-chart")
        .transition()
        .duration(500)
        .attr("width", 0)
        .attr("height", 0)
    d3.select("#beeswarm-chart").selectAll("*").remove();
}

document.addEventListener("DOMContentLoaded", function () {
    Promise.all([d3.csv(dataFile)])
    .then(function (values) {
        rawData = values[0];
        rawData.map(d => {
            for (const key in d) {
                if (key !== "country" && key !== "year" && key !== "region") {
                    d[key] = parseFloat(d[key]);
                }
            }
        });

        selectedXAttribute = keys["Birth Rate"];
        selectedSizeAttribute = keys["Birth Rate"];
        selectedYear = 1980;
        selectedRegions = ["North America"];

        createBeeswarm(rawData);

        var attributes = Object.keys(columns);

        d3.select("#x-axis-select").selectAll("option")
            .data(attributes)
            .enter()
            .append("option")
            .attr("value", d => d)
            .text(d => columns[d]);

        d3.select("#size-select").selectAll("option")
            .data(attributes)
            .enter()
            .append("option")
            .attr("value", d => d)
            .text(d => columns[d]);

        var regions = rawData.map(d => d.region);
        regions = regions.filter((d, i) => regions.indexOf(d) === i);
    
        const regionsSelect = d3.select("#regions-select");
        regionsSelect.selectAll("div")
            .data(regions)
            .enter()
            .append("div")
            .html(d => `
                <input type="checkbox" class="region-checkbox" value="${d}" ${d==selectedRegions[0] ? 'checked' : ''}>
                <label>${d}</label>
            `);
        
        d3.select("#select-all").on("click", selectAllRegions);
        d3.select("#deselect-all").on("click", deselectAllRegions);

        d3.selectAll("input[type='checkbox']").on("change", function () {
            selectedRegions = getSelectedRegions();
            if (selectedRegions.length === 0) {
                d3.select("#beeswarm-chart").selectAll("*").remove();
            }
            createBeeswarm(rawData);
        });
    });
});


d3.select("#x-axis-select").on("change", function () {
    selectedXAttribute = d3.select(this).property("value");
    createBeeswarm(rawData);
});

d3.select("#size-select").on("change", function () {
    selectedSizeAttribute = d3.select(this).property("value");
    createBeeswarm(rawData);
});

var year_input = d3.select("#year-input").on("input", function () {
    if (+d3.select(this).property("value") > 1979 && +d3.select(this).property("value") < 2014) {
        selectedYear = +d3.select(this).property("value");
    } else {
        selectedYear = 1980;
    }
    d3.select("#year-slider").property("value", selectedYear);
    createBeeswarm(rawData);
});

var year_slider = d3.select("#year-slider").on("input", function () {
    selectedYear = +d3.select(this).property("value");
    year_input.property("value", selectedYear);
    createBeeswarm(rawData);
});

d3.select("#play-button").on("click", function () {
    isPlaying = !isPlaying;
    d3.select(this).text(isPlaying ? "Pause" : "Play");
    if (!isPlaying || selectedYear == 2013) {
        clearInterval(yearInterval);
        d3.select(this).text("Play");
    } else if (isPlaying) {
        yearInterval = setInterval(function () {
            if (selectedYear < 2014) {
                selectedYear++;
            }
            if (selectedYear == 2013) {
                clearInterval(yearInterval);
                d3.select(this).text("Play");
            }
            year_slider.property("value", selectedYear);
            year_input.property("value", selectedYear);
            createBeeswarm(rawData);
        }, 500);
    }
});


function createBeeswarm(data) {

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = 1000 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
    
    if(d3.select("#beeswarm-chart").empty()) {
        var svg = d3.select("#beeswarm-chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .transition()
        .duration(500)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    } else {
        var svg = d3.select("#beeswarm-chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform", `translate(${margin.left},${margin.top})`);
    }

    const xAttribute = selectedXAttribute;
    const sizeAttribute = selectedSizeAttribute;

    var yearFiltered = data.filter(d => d.year == selectedYear && selectedRegions.includes(d.region));

    const xScale = d3.scaleLinear()
        .domain([d3.extent(data, d => d[xAttribute])[0], d3.extent(data, d => d[xAttribute])[1]])
        .range([0, width]);

    const sizeScale = d3.scaleLinear()
        .domain([d3.extent(data, d => d[sizeAttribute])[0], d3.extent(data, d => d[sizeAttribute])[1]])
        .range([5, 20]);
    
    var xAxis;
    var label;
    
    if(d3.select(".x-axis").empty()) {
        
        xAxis = svg.append("g")
        .attr("class", "x-axis")
        .call(d3.axisBottom(xScale))
        .attr("transform", `translate(0, ${height})`)

        var label = svg.append("text")
            .attr("class", "x-axis-label")
            .attr("x", width / 2)
            .attr("y", height - 5)
            .attr("text-anchor", "middle")
            .attr("transform", `translate(0, ${margin.bottom})`)
            .attr("opacity", "0")
            .transition()
            .duration(500)
            .delay(0)
            .text(columns[xAttribute])
            .attr("opacity", "1");

    } else {
        xAxis = d3.select(".x-axis")
        .transition()
        .duration(500)
        .delay(500)
        .call(d3.axisBottom(xScale))

        d3.select(".x-axis-label")
            .transition()
            .duration(500)
            .attr("opacity", "0")
            .transition()
            .duration(500)
            .delay(500)
            .text(columns[xAttribute])
            .attr("opacity", "1");
        
    }
    
    let simulation = d3.forceSimulation(yearFiltered)
    .force("x", d3.forceX((d) => {
        return xScale(d[xAttribute]);
        }).strength(1))
    .force("y", d3.forceY(height / 2).strength(0.2))
    .force("collide", d3.forceCollide((d) => {
        return sizeScale(d[sizeAttribute]);
        }))
    .stop();

    let color = d3.scaleOrdinal().range(d3.schemePaired).domain(yearFiltered.map(d => d.region));

    simulation.tick(500);

    var tooltip = d3.select("#tooltip_div");

    svg.selectAll(".circle")
        .data(yearFiltered)
        .join(
            enter => enter.append("circle")
            .attr("opacity", 1)
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .transition()
            .duration(500)
            .delay(100)
            .attr("r", d => sizeScale(d[sizeAttribute]))
            .style("fill", (d) => color(d.region)),
            update => update
            .transition()
            .duration(500)
            .delay((d, i) => 250+ i*10)
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", d => sizeScale(d[sizeAttribute]))
            .style("fill", (d) => color(d.region)),
            exit => exit
            .transition()
            .duration(500)
            .attr("r", 0)
            .remove()
        )
        .attr("class", "circle")
        .style("stroke", "black")
        .style("stroke-width", 1)
        .on('mouseover', function(e, d) {
            tooltip.html(`  Country: ${d.country}<br>
                            X-axis: ${d[xAttribute]}<br>
                            Size: ${d[sizeAttribute]}<br>
                            <img src="images/w40/${countries_map[d.country]}" alt="${d.country}">
                        `)
                .style("opacity", 1)
                .style("left", (e.clientX+5)+'px')
                .style("top", (e.clientY+10)+'px');
        })
        .on('mousemove', function(e, d) {
            tooltip.html(`  Country: ${d.country}<br>
                            X-axis: ${d[xAttribute]}<br>
                            Size: ${d[sizeAttribute]}<br>
                            <img src="images/w40/${countries_map[d.country]}" alt="${d.country}">
                        `)
                .style("opacity", 1)
                .style("left", (e.clientX+5)+'px')
                .style("top", (e.clientY+10)+'px');
        })
        .on('mouseout', function (e, d) {
            tooltip.style("opacity", 0);
        });
    
}
