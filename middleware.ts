import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { allBlogs } from 'contentlayer/generated'

/**
 * 根据slug获取博客文章
 */
function getPostBySlug(slug: string) {
  return allBlogs.find((post) => post.slug === slug)
}

// 检查权限的模式
type AccessMode = 'blog' | 'admin' | 'other'

/**
 * 检查用户是否有权限访问
 * 从请求的cookie中获取用户信息
 */
function checkUserAccess(request: NextRequest): boolean {
  // 检查token是否存在，作为基本的登录检查
  const token = request.cookies.get('token')?.value
  if (!token) {
    return false
  }
  
  // 从cookie中获取用户信息
  const userCookie = request.cookies.get('user')?.value
  if (!userCookie) {
    return false
  }
  
  try {
    const userData = JSON.parse(userCookie)
    // 检查用户是否有管理员或版主权限
    return (
      Array.isArray(userData.roles) && 
      (userData.roles.includes('ROLE_ADMIN') || userData.roles.includes('ROLE_MODERATOR'))
    )
  } catch (e) {
    console.error('Failed to parse user cookie:', e)
    return false
  }
}

/**
 * 检查特定路径是否需要权限控制
 */
function checkPathRequiresAccess(pathname: string, mode: AccessMode): boolean {
  // 博客文章路径检查
  if (mode === 'blog' && pathname.startsWith('/blog/')) {
    const blogSlug = pathname.replace('/blog/', '')
    
    // 跳过博客列表页和分页
    if (!blogSlug || blogSlug === 'page' || blogSlug.startsWith('page/')) {
      return false
    }
    
    // 获取博客文章并检查needAccess属性
    const post = getPostBySlug(blogSlug)
    return post?.needAccess === true
  }
  
  // 管理员页面检查
  if (mode === 'admin' && pathname.startsWith('/admin/')) {
    return true // 所有管理员页面都需要权限
  }
  
  // 自定义页面检查，可以在这里添加其他需要权限的路径
  if (mode === 'other') {
    // 示例: 检查是否为受保护的设置页面
    if (pathname.startsWith('/settings/') && !pathname.startsWith('/settings/public/')) {
      return true
    }
  }
  
  return false
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 检查各种类型的受保护页面
  const requiresAccess = 
    checkPathRequiresAccess(pathname, 'blog') ||
    checkPathRequiresAccess(pathname, 'admin') ||
    checkPathRequiresAccess(pathname, 'other')
  
  // 如果页面需要权限控制，检查用户是否有权限
  if (requiresAccess) {
    const hasAccess = checkUserAccess(request)
    
    // 如果没有权限，重定向到404页面
    if (!hasAccess) {
      // 添加Cache-Control头，防止浏览器缓存重定向
      const response = NextResponse.rewrite(new URL('/not-found', request.url))
      response.headers.set('Cache-Control', 'no-store, max-age=0')
      return response
    }
  }
  
  // 对不需要权限的页面或者有权限的用户，继续处理请求
  return NextResponse.next()
}

// 配置中间件匹配的路径
// 添加所有可能需要权限控制的路径模式
export const config = {
  matcher: [
    '/blog/:path*',
    '/admin/:path*',
    '/settings/:path*',
    // 可以添加更多需要权限控制的路径
  ],
}