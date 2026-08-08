// ===========================================
// LOAD RECORDS
// ===========================================

import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ===========================================
// LOAD RECORDS FROM FIREBASE
// ===========================================

async function loadRecords() {

    const container =
        document.getElementById("recordsContainer");

    if (!container) return;


    container.innerHTML = `
        <div class="records-loading">
            🏆 Loading Records...
        </div>
    `;


    try {

        const recordsQuery = query(
            collection(db, "records"),
            orderBy("timestamp", "desc")
        );


        const snapshot =
            await getDocs(recordsQuery);


        container.innerHTML = "";


        if (snapshot.empty) {

            container.innerHTML = `
                <div class="record-empty">
                    <h2>🏆 No Records Yet</h2>

                    <p>
                        Records will appear here soon.
                    </p>
                </div>
            `;

            return;
        }


        snapshot.forEach((recordDoc) => {

            const record =
                recordDoc.data();


            const card =
                document.createElement("div");


            card.className =
                "record-card";


            card.innerHTML = `

                <div class="record-icon">
                    🏆
                </div>

                <div class="record-content">

                    <h2>
                        ${record.title || "Record"}
                    </h2>

                    <div class="record-value">
                        ${record.value || "-"}
                    </div>

                    ${
                        record.description
                        ? `
                            <p>
                                ${record.description}
                            </p>
                        `
                        : ""
                    }

                </div>

            `;


            container.appendChild(card);

        });

    }


    catch (error) {

        console.error(
            "Records Error:",
            error
        );


        container.innerHTML = `
            <div class="record-empty">

                <h2>
                    ⚠️ Unable to Load Records
                </h2>

                <p>
                    Please try again later.
                </p>

            </div>
        `;

    }

}


// ===========================================
// START
// ===========================================

loadRecords();