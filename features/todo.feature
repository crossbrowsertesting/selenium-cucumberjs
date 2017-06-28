Feature: CBT Feature

  Scenario: Testing ToDos
    Given I visit a ToDo app
    When I click some ToDos
    Then I add another ToDo to our list
    When I archive my old ToDos
    Then I should have 4 ToDos