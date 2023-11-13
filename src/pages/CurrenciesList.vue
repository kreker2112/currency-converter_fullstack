<template>
    <form>
        <fieldset>
            <legend>Please select your preferred contact method:</legend>
            <div>
                <input
                    id="contactChoice1"
                    type="radio"
                    name="contact"
                    value="email"
                    checked
                />
                <label for="contactChoice1">Email</label>

                <input
                    id="contactChoice2"
                    type="radio"
                    name="contact"
                    value="phone"
                />
                <label for="contactChoice2">Phone</label>

                <input
                    id="contactChoice3"
                    type="radio"
                    name="contact"
                    value="mail"
                />
                <label for="contactChoice3">Mail</label>
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </fieldset>
    </form>
</template>

<script>
export default {
    name: 'CurrenciesList',
    components: {},
    data() {
        return {}
    },
}
</script>

<style scoped>
div:first-of-type {
    display: flex;
    align-items: flex-start;
    margin-bottom: 5px;
}

label {
    margin-right: 15px;
    line-height: 32px;
}

input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    border-radius: 50%;
    width: 16px;
    height: 16px;

    border: 2px solid #999;
    transition: 0.2s all linear;
    outline: none;
    margin-right: 5px;

    position: relative;
    top: 4px;
}

input:checked {
    border: 6px solid black;
}

button,
legend {
    color: white;
    background-color: black;
    padding: 5px 10px;
    border-radius: 0;
    border: 0;
    font-size: 14px;
}

button:hover,
button:focus {
    color: #999;
}

button:active {
    background-color: white;
    color: black;
    outline: 1px solid black;
}
</style>
