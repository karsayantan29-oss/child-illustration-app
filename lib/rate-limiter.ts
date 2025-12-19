/**
 * Simple rate limiter for API routes
 * Prevents abuse and manages costs
 */

interface RateLimitConfig {
  interval: number // Time window in milliseconds
  maxRequests: number // Max requests per interval
}

class RateLimiter {
  private requests: Map<string, number[]> = new Map()
  private config: RateLimitConfig

  constructor(config: RateLimitConfig) {
    this.config = config
  }

  /**
   * Check if request is allowed
   * @param identifier - Unique identifier (IP address, user ID, etc.)
   * @returns true if request is allowed, false if rate limit exceeded
   */
  check(identifier: string): boolean {
    const now = Date.now()
    const requests = this.requests.get(identifier) || []

    // Remove old requests outside the time window
    const recentRequests = requests.filter(
      (time) => now - time < this.config.interval
    )

    if (recentRequests.length >= this.config.maxRequests) {
      return false // Rate limit exceeded
    }

    // Add current request
    recentRequests.push(now)
    this.requests.set(identifier, recentRequests)

    return true
  }

  /**
   * Get remaining requests for identifier
   */
  getRemaining(identifier: string): number {
    const now = Date.now()
    const requests = this.requests.get(identifier) || []
    const recentRequests = requests.filter(
      (time) => now - time < this.config.interval
    )
    return Math.max(0, this.config.maxRequests - recentRequests.length)
  }

  /**
   * Reset rate limit for identifier
   */
  reset(identifier: string): void {
    this.requests.delete(identifier)
  }

  /**
   * Clean up old entries (run periodically)
   */
  cleanup(): void {
    const now = Date.now()
    for (const [identifier, requests] of this.requests.entries()) {
      const recentRequests = requests.filter(
        (time) => now - time < this.config.interval
      )
      if (recentRequests.length === 0) {
        this.requests.delete(identifier)
      } else {
        this.requests.set(identifier, recentRequests)
      }
    }
  }
}

// Default rate limiter: 10 requests per 15 minutes
export const personalizeRateLimiter = new RateLimiter({
  interval: 15 * 60 * 1000, // 15 minutes
  maxRequests: 10,
})

// Clean up every 30 minutes
setInterval(() => {
  personalizeRateLimiter.cleanup()
}, 30 * 60 * 1000)

/**
 * Get client identifier from request
 */
export function getClientIdentifier(req: any): string {
  // Try to get IP from various headers
  const forwarded = req.headers['x-forwarded-for']
  const ip = forwarded
    ? forwarded.split(',')[0].trim()
    : req.socket.remoteAddress

  return ip || 'unknown'
}

/**
 * Middleware to check rate limit
 */
export function checkRateLimit(req: any): {
  allowed: boolean
  remaining: number
} {
  const identifier = getClientIdentifier(req)
  const allowed = personalizeRateLimiter.check(identifier)
  const remaining = personalizeRateLimiter.getRemaining(identifier)

  return { allowed, remaining }
}
