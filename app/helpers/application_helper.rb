module ApplicationHelper
  def dollar number
    "$#{decify(number)}"
  end

  def decify number
    number_with_delimiter(number.to_i)
  end

  def with_mobile img_name
    img_name = browser.device.mobile? ?  "m_#{img_name}" : img_name
  end
end
