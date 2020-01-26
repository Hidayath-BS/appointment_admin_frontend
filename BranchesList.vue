<template>
<v-container fluid>
<v-card>
<v-card-title>
<v-layout row wrap>
<v-flex>
<h5>Select Combination</h5>
</v-flex>
<v-spacer></v-spacer>
<v-flex xs2>
<v-btn small color="primary" @click="addQpPage()">
ADD Question Paper
</v-btn>
</v-flex>
</v-layout>
</v-card-title>
<v-divider></v-divider>
<v-card-text>
<v-layout row wrap>
<v-flex xs3>
<v-select
:items="topics"
label="Select Topics"
outline></v-select>
</v-flex>
<v-spacer></v-spacer>
<v-flex xs3>
<v-select
:items="subtopics"
label="Select Sub-Topics"
outline></v-select>
</v-flex>
</v-layout>
</v-card-text>
</v-card>
<br>
<v-divider></v-divider>
<br>
<v-layout row wrap>
<v-flex xs12>
<v-data-table
:headers="headers"
:items="questionPapers">
<template slot="items" slot-scope="props">
<td> {{ props.index + 1 }} </td>
<td> {{ props.item.code }} </td>
<td> {{ props.item.level }} </td>
<td> {{ props.item.date }} </td>
<td> {{ props.item.noqs }} </td>
<td>
<v-btn small dark color="info" @click="setQp(props.item.id)">
SET
</v-btn>
</td>

<td>
<v-btn small fab dark color="error">
<v-icon>delete</v-icon>
</v-btn>
</td>
</template>
</v-data-table>
</v-flex>

</v-layout>
</v-container>
</template>
<script>
export default {
data(){
return {
topics: ["Numericals", "Verbals", "Technical"],
subtopics: ["Time & Work", "Antonyms", "Java"],
headers: [
{
text: 'Sl No',
align: 'left',
sortable: false,
value: 'Sl No',
},
{ text: 'Qp Code', value: 'code'},
{ text: 'Difficulty level', value: 'level'},
{ text: 'Created On', value: 'date' },
{ text: 'Number of Questions', value: 'Nos' },
{ text: 'Set Questions', value: 'set' },
{ text: 'Delete', value: 'Delete' }
],
questionPapers: [
{
id: '1',
code: 'MTNU1',
level: 'Easy',
date: '2019-07-31',
noqs: 10
},
{
id: '2',
code: 'MTNU2',
level: 'Medium',
date: '2019-07-31',
noqs: 12
}
],
}
},
methods: {
addQpPage() {
this.$router.push('/practice/addQuestionpaper');
},
setQp(id) {
this.$router.push('/practice/QuestionpaperSet/'+id);
},
questionPaperDetails(id) {
this.$router.push('/practice/QuestionpaperDetails/'+id);
}
}
}
</script>
<style>

</style>