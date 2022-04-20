const milestoneData = JSON.parse(apiData).data; // returns an Array

// load course milestones data
function loadMilestones() {
    const milestones = document.querySelector(".milestones");

    // converting all object into markup
    milestones.innerHTML = `${milestoneData.map(function(milestone){
        return `<div class="milestone border-b" id="${milestone._id}" >

                    <div class="flex">
                        <div class="checkbox"> <input type="checkbox" onclick = "markMilestone(this, ${milestone._id})" /> </div>

                        <div onclick="openMilestone(this, ${milestone._id})">
                            <p>
                                ${milestone.name}
                                <span><i class="fas fa-chevron-down"></i></span>
                            </p>
                        </div>
                    </div>

                    <div class="hidden_panel">
                        ${milestone.modules.map(function(module){
                            return `<div class="module border-b">
                                        <p>${module.name}</p>
                                    </div>`
                        }).join("")}
                    </div>

                </div>`;
    }).join("")}`;
};

function openMilestone(div, id){
    const hidden_panel = div.parentNode.nextElementSibling;
    const shown_panel = document.querySelector(".show");
    const previousBold = document.querySelector(".active");

    if(shown_panel && !hidden_panel.classList.contains("show")){
        shown_panel.classList.remove("show");
    }
    hidden_panel.classList.toggle("show");

    if(previousBold && !div.classList.contains("active")){
        previousBold.classList.remove("active");
    }
    div.classList.toggle('active');

    changMilestoneImage(id);
}

function changMilestoneImage(id){
    const milestoneImage = document.querySelector(".milestoneImage");
    const title = document.querySelector(".title");
    const description = document.querySelector(".details");

    milestoneImage.style.opacity = 0.2;
    milestoneImage.src = milestoneData[id].image;

    title.innerText = milestoneData[id].name;
    description.innerText = milestoneData[id].description;
}

const milestoneImage = document.querySelector(".milestoneImage");
milestoneImage.onload = function(){
    milestoneImage.style.opacity = 1;
}

function markMilestone(checkbox, id) {
    const milestoneList = document.querySelector(".milestones");
    const doneList = document.querySelector(".doneList");
    const item = document.getElementById(id);
    let count = 0;

    if(checkbox.checked){
        // add to doneList
        milestoneList.removeChild(item);
        doneList.appendChild(item);
        
    }else{
        // back to milestoneList
        doneList.removeChild(item);
        // milestoneList.appendChild(item);
        
        // sorting the id
        const sorting = Array.from(milestoneList.children).map(function(value){
            return value.id;
        }).sort((a, b) => a - b);

        if(milestoneList.childElementCount == 0){
            milestoneList.appendChild(item);
        }else{
            // reload the loop
            for(let x of sorting){
                if(id < x){
                    milestoneList.insertBefore(item, document.getElementById(x));
                    count = 1;
                    break
                }
            }

            if(count === 0){
                milestoneList.appendChild(item);
            }
        }

    }
}

loadMilestones();