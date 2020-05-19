exports.seed = function(knex) {
// Deletes ALL existing entries
return knex('reviews')
.del()
.then(function() {
// Inserts seed entries
return knex('reviews').insert([
{
id: 1,
job_title: "Full Stack Developer",
start_date: 2123,
overall_rating: 3,
end_date: 2000,
comment: "What is Lorem ipsum? A quick and simplified answer is that Lorem Ipsum refers to text that the DTP (Desktop Publishing) industry use as replacement text when the real text is not available.For example, when designing a brochure or book, a designer will insert Lorem ipsum text if the real text is not available. The Lorem ipsum text looks real enough that the brochure or book looks complete. The book or brochure can be shown to the client for approval. ",
typical_hours: 40,
salary: 6000,
city: "Los Angeles",
difficulty_rating: 4,
phone_interview: false,
resume_review: false,
take_home_assignments: false,
online_coding_assignments: false,
portfolio_review: false,
screen_share: true,
open_source_contribution: false,
side_projects: false,
interview_rounds: 3,
user_id: 1,
review_type_id: 2,
state_id: 5,
company_name: "Google",
offer_status_id: 2,
work_status_id: 1,
created_at: "2020-03-19T20:32:17.896Z",
updated_at: "2020-03-19T20:32:17.896Z"
}
]);
});
};
