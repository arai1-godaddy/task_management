FactoryBot.define do
    factory :task do
      title { Faker::Lorem.sentence(word_count: 3) }
      priority { Task.priorities.keys.sample }
      status { Task.statuses.keys.sample }
      due_date { Faker::Time.forward(days: 30) }
      user
    end
end  