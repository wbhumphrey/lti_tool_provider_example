LtiToolProvider::Application.routes.draw do
  resources :tool_proxy, only: [:create]

  post 'messages/blti', to: 'message#basic_lti_launch_request'

  post 'register', to: 'registration#register'
  post 'submit_capabilities', to: 'registration#save_capabilities', as: 'save_capabilities'

  mount RailsLti2Provider::Engine => "/rails_lti2_provider"

end
