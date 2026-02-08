import { Component, type ErrorInfo, type ReactNode } from "react";
import { errorReporter } from "@/lib/errorReporter";
import { ErrorFallback } from "./ErrorFallback";

interface Props {
  children: ReactNode;
  fallback?: (
    error: Error,
    errorInfo: ErrorInfo,
    retry: () => void,
  ) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    errorReporter.report(error, {
      componentStack: errorInfo.componentStack || undefined,
    });
    this.setState({ error, errorInfo });
  }

  retry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    // Reload the page to ensure clean state
    window.location.reload();
  };

  goHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(
          // biome-ignore lint/style/noNonNullAssertion: state is set when hasError is true
          this.state.error,
          // biome-ignore lint/style/noNonNullAssertion: state is set when hasError is true
          this.state.errorInfo!,
          this.retry,
        );
      }

      // Use shared ErrorFallback component
      return (
        <ErrorFallback
          error={this.state.error}
          onRetry={this.retry}
          onGoHome={this.goHome}
        />
      );
    }

    return this.props.children;
  }
}
