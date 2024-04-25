var div_output = document.getElementById("output");
var teste = {
    sinal_level: 4, // alturas diferentes que o sinal pode assumir
    sinal_variation: 2, // Quantas trocas um sinal faz para representar um dado
    data_level: 3, // Numero de Dados Codificados juntamente
    // , pode ser trocado por array de dados
    data: ["11", "01", "00", "10"], //Dados codificados
    signal: [[3, 2], [1, 3], [0, 3], [2, 3]], //Os sinais em si
    base_line: 2, // Linha referência
    data_per_line: 2, // Quantos dados serão codificados por linha
    start_level: 1 //Nivel de sinal inicial
};
function verticalSignal(from, to, from_str) {
    var position = to.split(":");
    var level = parseInt(position[2]);
    if (from > level) {
        for (var index = level; index < from; index++) {
            var unit = position;
            unit[2] = index.toString();
            console.log(unit.join(":"));
            var unitElement = document.getElementById(unit.join(":"));
            unitElement.classList.add("signal_left");
        }
    }
    else {
        for (var index = from; index < level; index++) {
            var unit = position;
            unit[2] = index.toString();
            console.log(unit.join(":"));
            var unitElement = document.getElementById(unit.join(":"));
            unitElement.classList.add("signal_left");
        }
    }
    if (from_str != '\0') {
        var from_split = from_str.split(":");
        if (from > level) {
            for (var index = level; index < from; index++) {
                var unit = from_split;
                unit[2] = index.toString();
                console.log(unit.join(":"));
                var unitElement = document.getElementById(unit.join(":"));
                unitElement.classList.add("signal_right");
            }
        }
        else {
            for (var index = from; index < level; index++) {
                var unit = from_split;
                unit[2] = index.toString();
                console.log(unit.join(":"));
                var unitElement = document.getElementById(unit.join(":"));
                unitElement.classList.add("signal_right");
            }
        }
    }
}
function generateView(CL) {
    div_output.innerHTML = "";
    //Linhas  || Criando GRIDS
    for (var index_line = 0; index_line < CL.data.length / CL.data_per_line; index_line++) {
        var wrapper_line = document.createElement("div");
        wrapper_line.classList.add("row");
        var enfeite_line = document.createElement("div");
        enfeite_line.classList.add("col-1");
        enfeite_line.classList.add("enfeite");
        for (var index = 0; index < CL.sinal_level + 1; index++) {
            var tmp = document.createElement("div");
            tmp.classList.add("row");
            enfeite_line.prepend(tmp);
            if (index == CL.base_line) {
                var tmp2 = document.createElement("div");
                tmp2.classList.add("row");
                tmp2.classList.add("zero_line");
                tmp.append(tmp2);
                tmp2.innerHTML = "<p>0</p>";
            }
        }
        //Create Line
        var signal_line = document.createElement("div");
        signal_line.classList.add("col");
        signal_line.classList.add("row");
        signal_line.classList.add("line");
        //Colunas a esquerda que possuem a linha Base
        //Block of Data encoded
        for (var index_data = 0; index_data < CL.data_per_line; index_data++) {
            var data_line = document.createElement("div");
            //data_line.innerText = CL.data[index]
            data_line.classList.add("col");
            data_line.classList.add("data_unit");
            data_line.classList.add("dash");
            // Niveis de Linha
            for (var index_sinal_level = 0; index_sinal_level < CL.sinal_level; index_sinal_level++) {
                var data_line_row = document.createElement("div");
                data_line_row.classList.add("row");
                data_line_row.classList.add("data_unit_row");
                //data_line_row.classList.add("dash")
                //Variações de Linha || Menor unidade de DIV
                for (var index_sinal_var = 0; index_sinal_var < CL.sinal_variation; index_sinal_var++) {
                    var data_line_row_col = document.createElement("div");
                    data_line_row_col.innerText = "  ";
                    data_line_row_col.classList.add("col");
                    data_line_row_col.classList.add("data_unit_row_col");
                    data_line_row_col.classList.add("dash");
                    data_line_row_col.id = index_line + ":" + index_data + ":" + index_sinal_level + ":" + index_sinal_var;
                    if (index_sinal_level == CL.base_line) {
                        data_line_row_col.classList.add("zero_line");
                    }
                    data_line_row.append(data_line_row_col);
                }
                data_line.prepend(data_line_row);
            }
            // Data Label
            var data_label = document.createElement("div");
            data_label.classList.add("row");
            data_label.classList.add("data_label");
            data_line.prepend(data_label);
            var label = document.createElement("p");
            console.log(index_data + index_line * CL.data_per_line);
            label.innerHTML = CL.data[index_data + index_line * CL.data_per_line];
            data_label.prepend(label);
            signal_line.append(data_line);
        }
        wrapper_line.append(enfeite_line);
        wrapper_line.append(signal_line);
        div_output.appendChild(wrapper_line);
    }
    // Desenhando lina de Sinal
    //Este loop e o anterior poderiam ser unidos, mas afim de facilitar para minha cabeça sonolenta vou fazer separado
    var prev_level = CL.start_level;
    var prev_id = '\0';
    for (var index_line = 0; index_line < CL.data.length / CL.data_per_line; index_line++) {
        for (var index_data = 0; index_data < CL.data_per_line; index_data++) {
            var signal_datas = CL.signal[index_line * CL.data_per_line + index_data];
            // for (let index_sinal_level = 0; index_sinal_level < CL.sinal_level; index_sinal_level++){
            // }
            for (var index_sinal_var = 0; index_sinal_var < CL.sinal_variation; index_sinal_var++) {
                var sig_level = signal_datas[index_sinal_var];
                var unit_id = index_line + ":" + index_data + ":" + sig_level + ":" + index_sinal_var;
                var unit_element = document.getElementById(unit_id);
                unit_element.classList.add("signal_bottom");
                verticalSignal(prev_level, unit_id, prev_id);
                prev_id = unit_id;
                prev_level = sig_level;
            }
            //         let unit_id: string = index_line+":"+index_data+":"+index_sinal_level+":"+index_sinal_var;
            //         let unit_element: HTMLElement = document.getElementById(unit_id)
            //         unit_element.classList.add("signal_bottom");
            //}     }
        }
    }
}
