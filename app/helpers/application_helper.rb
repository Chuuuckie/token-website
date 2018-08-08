module ApplicationHelper
  def dollar number
    "$#{decify(number)}"
  end

  def decify number
    number_with_delimiter(number.to_i)
  end
end
