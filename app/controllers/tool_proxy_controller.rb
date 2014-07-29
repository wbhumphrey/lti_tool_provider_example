require 'faraday_middleware'

class ToolProxyController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    registration_request = IMS::LTI::Models::Messages::RegistrationRequest.new(params)

    connection = Faraday.new
    response = connection.get(registration_request.tc_profile_url)
    #TODO TCP retrieval
    tool_consumer_profile = IMS::LTI::Models::ToolConsumerProfile.new.from_json(response.body)

    tool_service = tool_consumer_profile.services_offered.map(&:profile)

    security_contract = IMS::LTI::Models::SecurityContract.new(
        shared_secret: 'secret',
        tool_service: tool_service,
        # end_user_service: [IMS::LTI::Models::RestServiceProfile.new]
    )

    tool_proxy = IMS::LTI::Models::ToolProxy.new(
        id: "instructure.com/tool-provider-example:#{SecureRandom.uuid}",
        lti_version: 'LTI-2p0',
        security_contract: security_contract,
        tool_consumer_profile: registration_request.tc_profile_url,
        tool_profile: tool_profile,
    )

    #TODO Helper method in gem to retrieve service by service id and optionally action
    tool_consumer_service = tool_consumer_profile.services_offered.find{|service| service.id == 'tcp:ToolProxy.collection' && service.action.include?('POST')}

    #TODO Implement API client for standardized services
    conn = Faraday.new do |conn|
      conn.request :oauth, consumer_key: registration_request.reg_key, consumer_secret: registration_request.reg_password
      conn.response :logger
      conn.adapter :net_http
    end

    #TODO try using simple oauth to generate signed params for messages

    response = conn.post do |req|
      req.url tool_consumer_service.endpoint
      req.headers['Content-Type'] = 'application/json'
      req.body = tool_proxy.to_json
    end

    #proxy created successfully
    if response.status == 201
      redirect_to registration_request.launch_presentation_return_url
    else
      render text: "Failed to create a tool proxy in #{tool_consumer_profile.product_instance.product_info.product_name.default_value}"
    end
  end

  private
  def product_instance
    product_instance = IMS::LTI::Models::ProductInstance.new.from_json(File.read(File.join(Rails.root, 'config', 'product_instance.json')))

    product_instance.guid = LTI_CONFIG[:product_instance_guid] || 'invalid'
    product_instance.product_info.product_version = '2.x'
    product_instance
  end

  def tool_profile
    message = IMS::LTI::Models::MessageHandler.new(
        message_type: 'basic-lti-launch-request',
        path: "my-tool-launch",
    )

    IMS::LTI::Models::ToolProfile.new(
        lti_version: 'LTI-2p0',
        product_instance: product_instance,
        message: message
    )
  end
end