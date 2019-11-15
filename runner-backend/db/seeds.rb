# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Run.destroy_all
Goal.destroy_all
Runner.destroy_all

kat = Runner.create(name: 'Kat')
phil = Runner.create(name: 'Phil')

goal1 = Goal.create(category: 'pace', value: 9.30, runner: kat)
goal2 = Goal.create(category: 'mileage', value: 30, runner: phil)

run1 = Run.create(distance: 3.00, pace: 10.00, date: '2019-01-08', rating: 2, goal: goal1, runner: kat)
run2 = Run.create(distance: 5.00, pace: 8.30, date: '2019-11-11', rating: 3, goal: goal2, runner: phil)
run1 = Run.create(distance: 3.00, pace: 10.00, date: '2019-01-09', rating: 2, goal: goal1, runner: kat)
run1 = Run.create(distance: 3.00, pace: 10.00, date: '2019-01-20', rating: 2, goal: goal1, runner: kat)

