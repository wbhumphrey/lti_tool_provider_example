class ToolProxyController < ApplicationController
  def create
    reg_service = IMS::LTI::Services::ToolProxyRegistrationService.new(params)
    tool_consumer_profile = reg_service.tool_consumer_profile
    tool_consumer_profile.service_offered

    security_contract = IMS::LTI::SecurityContract.new(
      shared_secret: 'sekret',
      tool_service: [IMS::LTI::RestServiceProfile.new],
      end_user_service: [IMS::LTI::Models::RestServiceProfile.new]
    )
    tool_profile = IMS::LTI::Models::ToolProfile.new(

    )
    IMS::LTI::ToolProxy.new(
        id: tool_proxy_show,
        lti_version: 'LTI-2p0',
        security_contract: security_contract,
        tool_consumer_profile: 'some_uri',
        tool_profile: tool_profile,
    )

    consumer_profile = IMS::LTI::ToolProxyRegistrationService.consumer_profile


    consumer_profile = ConsumerProfileService.retrieve(url)
    ToolProxy

    # Get Consumer Profile
    # Generate Tool Proxy
    # Post tool proxy
  end

  def show

  end
end